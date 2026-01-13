import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to decode JWT and extract user ID
function getUserIdFromToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  
  try {
    const token = authHeader.replace("Bearer ", "");
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload.sub || null;
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get user ID from JWT token
    const authHeader = req.headers.get("Authorization");
    console.log("🔐 Auth header received:", authHeader ? "Present" : "Missing");
    
    const userId = getUserIdFromToken(authHeader);
    console.log("👤 User ID from token:", userId);

    if (!userId) {
      console.error("❌ No user ID extracted from token");
      return new Response(JSON.stringify({ error: "Unauthorized", details: "Invalid or missing JWT token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role to bypass RLS for all database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Check if user is super_admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    console.log("📊 Profile query result:", { profile, error: profileError });

    if (profileError) {
      console.error("❌ Profile query error:", profileError);
      return new Response(JSON.stringify({ error: "Database error", details: profileError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (profile?.role !== "super_admin") {
      console.error("❌ User role is not super_admin:", profile?.role);
      return new Response(JSON.stringify({ error: "Forbidden: Super admin access required", userRole: profile?.role }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("✅ User authorized as super_admin");

    const url = new URL(req.url);
    const path = url.pathname.replace("/sellers", "");
    const method = req.method;

    // GET /sellers/all - Get all sellers with optional status filter
    if (method === "GET" && path === "/all") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const status = url.searchParams.get("status");
      const offset = (page - 1) * limit;

      let query = supabaseAdmin
        .from("profiles")
        .select("*", { count: "exact" })
        .eq("role", "client");

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
        supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client").eq("seller_verification_status", "verified"),
        supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client").eq("seller_verification_status", "pending"),
        supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client").eq("seller_verification_status", "unverified"),
        supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client"),
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

      const { data: seller, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", sellerId)
        .single();

      if (error) throw error;

      // Get seller's products
      const { data: products } = await supabaseAdmin
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

      const { data: seller, error } = await supabaseAdmin
        .from("profiles")
        .update({
          seller_verification_status: "verified",
          seller_verified_at: new Date().toISOString(),
          seller_verified_by: userId,
        })
        .eq("id", seller_id)
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

      const { data: seller, error } = await supabaseAdmin
        .from("profiles")
        .update({
          seller_verification_status: "rejected",
          seller_verified_at: new Date().toISOString(),
          seller_verified_by: userId,
          seller_rejection_reason: reason,
        })
        .eq("id", seller_id)
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
