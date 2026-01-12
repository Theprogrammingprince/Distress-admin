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
      console.error("Auth error:", userError);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("User authenticated:", user.id);

    // Check if user is super_admin using service role to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("Profile check:", { profile, error: profileError });

    if (profileError || profile?.role !== "super_admin") {
      console.error("Access denied. User role:", profile?.role);
      return new Response(JSON.stringify({ error: "Forbidden: Super admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Super admin access granted for:", user.id);

    const url = new URL(req.url);
    const path = url.pathname.replace("/reviews", "");
    const method = req.method;

    // GET /reviews/products - Get product reviews
    if (method === "GET" && path === "/products") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const offset = (page - 1) * limit;

      const { data: reviews, error, count } = await supabaseClient
        .from("product_reviews")
        .select(`
          *,
          reviewer:profiles!product_reviews_reviewer_id_fkey(id, full_name, email),
          product:products(id, name, seller_id)
        `, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          reviews,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /reviews/sellers - Get seller reviews
    if (method === "GET" && path === "/sellers") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const offset = (page - 1) * limit;

      const { data: reviews, error, count } = await supabaseClient
        .from("seller_reviews")
        .select(`
          *,
          reviewer:profiles!seller_reviews_reviewer_id_fkey(id, full_name, email),
          seller:profiles!seller_reviews_seller_id_fkey(id, full_name, email, seller_business_name)
        `, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          reviews,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /reviews/stats - Get review statistics
    if (method === "GET" && path === "/stats") {
      const [productReviews, sellerReviews, flaggedReviews] = await Promise.all([
        supabaseClient.from("product_reviews").select("id, rating", { count: "exact" }),
        supabaseClient.from("seller_reviews").select("id, rating", { count: "exact" }),
        supabaseClient.from("product_reviews").select("id", { count: "exact", head: true }).eq("is_flagged", true),
      ]);

      const avgProductRating = productReviews.data?.length
        ? productReviews.data.reduce((sum, r) => sum + (r.rating || 0), 0) / productReviews.data.length
        : 0;

      const avgSellerRating = sellerReviews.data?.length
        ? sellerReviews.data.reduce((sum, r) => sum + (r.rating || 0), 0) / sellerReviews.data.length
        : 0;

      return new Response(
        JSON.stringify({
          product_reviews_count: productReviews.count || 0,
          seller_reviews_count: sellerReviews.count || 0,
          flagged_reviews_count: flaggedReviews.count || 0,
          avg_product_rating: parseFloat(avgProductRating.toFixed(1)),
          avg_seller_rating: parseFloat(avgSellerRating.toFixed(1)),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /reviews/flag - Flag a review
    if (method === "POST" && path === "/flag") {
      const { review_id, review_type, reason } = await req.json();

      if (!review_id || !review_type || !reason) {
        return new Response(
          JSON.stringify({ error: "review_id, review_type, and reason are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const table = review_type === "product" ? "product_reviews" : "seller_reviews";

      const { data: review, error } = await supabaseClient
        .from(table)
        .update({
          is_flagged: true,
          flagged_at: new Date().toISOString(),
          flagged_by: user.id,
          flag_reason: reason,
        })
        .eq("id", review_id)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Review flagged successfully",
          review,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /reviews/delete - Delete a review
    if (method === "POST" && path === "/delete") {
      const { review_id, review_type, reason } = await req.json();

      if (!review_id || !review_type || !reason) {
        return new Response(
          JSON.stringify({ error: "review_id, review_type, and reason are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const table = review_type === "product" ? "product_reviews" : "seller_reviews";

      const { error } = await supabaseClient
        .from(table)
        .update({
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          deleted_by: user.id,
          deletion_reason: reason,
        })
        .eq("id", review_id);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Review deleted successfully",
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
