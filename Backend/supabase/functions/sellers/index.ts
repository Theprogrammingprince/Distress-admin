import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user is super_admin
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "super_admin") {
      return new Response(JSON.stringify({ error: "Forbidden: Super admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const path = url.pathname.replace("/sellers", "");
    const method = req.method;

    // GET /sellers/all - Get all sellers with optional status filter
    if (method === "GET" && path === "/all") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const status = url.searchParams.get("status");
      const offset = (page - 1) * limit;

      let query = supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          email,
          phone,
          avatar_url,
          seller_verification_status,
          seller_business_name,
          seller_verified_at,
          created_at
        `, { count: "exact" })
        .eq("role", "seller");

      if (status && ["verified", "pending", "unverified", "rejected"].includes(status)) {
        query = query.eq("seller_verification_status", status);
      }

      const { data: sellers, error, count } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          sellers,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /sellers/stats - Get seller statistics
    if (method === "GET" && path === "/stats") {
      const [verified, pending, unverified, total] = await Promise.all([
        supabaseClient.from("profiles").select("id", { count: "exact", head: true }).eq("role", "seller").eq("seller_verification_status", "verified"),
        supabaseClient.from("profiles").select("id", { count: "exact", head: true }).eq("role", "seller").eq("seller_verification_status", "pending"),
        supabaseClient.from("profiles").select("id", { count: "exact", head: true }).eq("role", "seller").eq("seller_verification_status", "unverified"),
        supabaseClient.from("profiles").select("id", { count: "exact", head: true }).eq("role", "seller"),
      ]);

      return new Response(
        JSON.stringify({
          verified_count: verified.count || 0,
          pending_count: pending.count || 0,
          unverified_count: unverified.count || 0,
          total_count: total.count || 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /admin/sellers/:id - Get single seller details
    if (method === "GET" && path.startsWith("/") && path !== "/all" && path !== "/stats" && path !== "/pending") {
      const sellerId = path.substring(1);

      const { data: seller, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", sellerId)
        .eq("role", "client")
        .single();

      if (error) throw error;

      // Get seller's products
      const { data: products } = await supabaseClient
        .from("products")
        .select("id, name, verification_status, created_at")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false })
        .limit(10);

      return new Response(
        JSON.stringify({
          ...seller,
          recent_products: products || [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /admin/sellers/approve - Approve a seller
    if (method === "POST" && path === "/approve") {
      const { seller_id } = await req.json();

      if (!seller_id) {
        return new Response(JSON.stringify({ error: "seller_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: seller, error } = await supabaseClient
        .from("profiles")
        .update({
          verification_status: "approved",
          verified_at: new Date().toISOString(),
          verified_by: user.id,
          rejection_reason: null,
        })
        .eq("id", seller_id)
        .eq("role", "client")
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Seller approved successfully",
          seller,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /admin/sellers/reject - Reject a seller
    if (method === "POST" && path === "/reject") {
      const { seller_id, reason } = await req.json();

      if (!seller_id || !reason) {
        return new Response(
          JSON.stringify({ error: "seller_id and reason are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: seller, error } = await supabaseClient
        .from("profiles")
        .update({
          verification_status: "rejected",
          verified_at: new Date().toISOString(),
          verified_by: user.id,
          rejection_reason: reason,
        })
        .eq("id", seller_id)
        .eq("role", "client")
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Seller rejected successfully",
          seller,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
