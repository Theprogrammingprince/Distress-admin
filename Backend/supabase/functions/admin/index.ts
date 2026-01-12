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
    const path = url.pathname.replace("/admin", "");
    const method = req.method;

    // GET /admin/pending - Get pending products
    if (method === "GET" && path === "/pending") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const offset = (page - 1) * limit;

      const { data: products, error, count } = await supabaseClient
        .from("products")
        .select(`
          *,
          seller:profiles!products_seller_id_fkey(id, full_name, email, phone)
        `, { count: "exact" })
        .eq("verification_status", "pending")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          products,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /admin/all - Get all products with optional status filter
    if (method === "GET" && path === "/all") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const status = url.searchParams.get("status");
      const offset = (page - 1) * limit;

      let query = supabaseClient
        .from("products")
        .select(`
          *,
          seller:profiles!products_seller_id_fkey(id, full_name, email, phone)
        `, { count: "exact" });

      if (status && ["pending", "approved", "rejected"].includes(status)) {
        query = query.eq("verification_status", status);
      }

      const { data: products, error, count } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          products,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /admin/stats - Get verification statistics
    if (method === "GET" && path === "/stats") {
      const { data: stats, error } = await supabaseClient.rpc("get_product_stats");

      if (error) {
        // Fallback if RPC doesn't exist - manual count
        const [pending, approved, rejected, total] = await Promise.all([
          supabaseClient.from("products").select("id", { count: "exact", head: true }).eq("verification_status", "pending"),
          supabaseClient.from("products").select("id", { count: "exact", head: true }).eq("verification_status", "approved"),
          supabaseClient.from("products").select("id", { count: "exact", head: true }).eq("verification_status", "rejected"),
          supabaseClient.from("products").select("id", { count: "exact", head: true }),
        ]);

        return new Response(
          JSON.stringify({
            pending_count: pending.count || 0,
            approved_count: approved.count || 0,
            rejected_count: rejected.count || 0,
            total_count: total.count || 0,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify(stats), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET /admin/product/:id - Get single product details
    if (method === "GET" && path.startsWith("/product/")) {
      const productId = path.split("/")[2];

      const { data: product, error } = await supabaseClient
        .from("products")
        .select(`
          *,
          seller:profiles!products_seller_id_fkey(id, full_name, email, phone)
        `)
        .eq("id", productId)
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(product), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /admin/approve - Approve a product
    if (method === "POST" && path === "/approve") {
      const { product_id } = await req.json();

      if (!product_id) {
        return new Response(JSON.stringify({ error: "product_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: product, error } = await supabaseClient
        .from("products")
        .update({
          verification_status: "approved",
          verified_at: new Date().toISOString(),
          verified_by: user.id,
          rejection_reason: null,
        })
        .eq("id", product_id)
        .select(`
          *,
          seller:profiles!products_seller_id_fkey(id, full_name, email)
        `)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Product approved successfully",
          product,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /admin/reject - Reject a product
    if (method === "POST" && path === "/reject") {
      const { product_id, reason } = await req.json();

      if (!product_id || !reason) {
        return new Response(
          JSON.stringify({ error: "product_id and reason are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: product, error } = await supabaseClient
        .from("products")
        .update({
          verification_status: "rejected",
          verified_at: new Date().toISOString(),
          verified_by: user.id,
          rejection_reason: reason,
        })
        .eq("id", product_id)
        .select(`
          *,
          seller:profiles!products_seller_id_fkey(id, full_name, email)
        `)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Product rejected successfully",
          product,
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
