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
    const userId = getUserIdFromToken(authHeader);
    
    console.log("Auth header present:", !!authHeader);
    console.log("User ID from token:", userId);

    if (!userId) {
      console.error("No valid user ID in token");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
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

    console.log("Profile check:", { profile, error: profileError });

    if (profileError || profile?.role !== "super_admin") {
      console.error("Access denied. User role:", profile?.role);
      return new Response(JSON.stringify({ error: "Forbidden: Super admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Super admin access granted for:", userId);

    const url = new URL(req.url);
    const path = url.pathname.replace("/reviews", "");
    const method = req.method;

    // GET /reviews/products - Get product reviews
    if (method === "GET" && path === "/products") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const offset = (page - 1) * limit;

      const { data: reviews, error, count } = await supabaseAdmin
        .from("product_reviews")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error("Error fetching product reviews:", error);
        // Return empty list if table doesn't exist
        return new Response(
          JSON.stringify({
            reviews: [],
            total: 0,
            page,
            totalPages: 0,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          reviews: reviews || [],
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

      const { data: reviews, error, count } = await supabaseAdmin
        .from("seller_reviews")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error("Error fetching seller reviews:", error);
        // Return empty list if table doesn't exist
        return new Response(
          JSON.stringify({
            reviews: [],
            total: 0,
            page,
            totalPages: 0,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          reviews: reviews || [],
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /reviews/products/stats - Get product review statistics
    if (method === "GET" && path === "/products/stats") {
      const { data: reviews, count, error } = await supabaseAdmin
        .from("product_reviews")
        .select("id, rating, is_flagged", { count: "exact" });

      if (error) {
        console.error("Error fetching product review stats:", error);
        // Return empty stats if table doesn't exist
        return new Response(
          JSON.stringify({
            total_count: 0,
            pending_count: 0,
            approved_count: 0,
            rejected_count: 0,
            flagged_count: 0,
            average_rating: 0,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const avgRating = reviews?.length
        ? reviews.reduce((sum: number, r: { rating: number }) => sum + (r.rating || 0), 0) / reviews.length
        : 0;

      const flaggedCount = reviews?.filter((r: { is_flagged: boolean }) => r.is_flagged).length || 0;

      return new Response(
        JSON.stringify({
          total_count: count || 0,
          pending_count: 0,
          approved_count: count || 0,
          rejected_count: 0,
          flagged_count: flaggedCount,
          average_rating: parseFloat(avgRating.toFixed(1)),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /reviews/sellers/stats - Get seller review statistics
    if (method === "GET" && path === "/sellers/stats") {
      const { data: reviews, count, error } = await supabaseAdmin
        .from("seller_reviews")
        .select("id, rating, is_flagged", { count: "exact" });

      if (error) {
        console.error("Error fetching seller review stats:", error);
        // Return empty stats if table doesn't exist
        return new Response(
          JSON.stringify({
            total_count: 0,
            pending_count: 0,
            approved_count: 0,
            rejected_count: 0,
            flagged_count: 0,
            average_rating: 0,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const avgRating = reviews?.length
        ? reviews.reduce((sum: number, r: { rating: number }) => sum + (r.rating || 0), 0) / reviews.length
        : 0;

      const flaggedCount = reviews?.filter((r: { is_flagged: boolean }) => r.is_flagged).length || 0;

      return new Response(
        JSON.stringify({
          total_count: count || 0,
          pending_count: 0,
          approved_count: count || 0,
          rejected_count: 0,
          flagged_count: flaggedCount,
          average_rating: parseFloat(avgRating.toFixed(1)),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /reviews/stats - Get combined review statistics (legacy)
    if (method === "GET" && path === "/stats") {
      const [productReviews, sellerReviews, flaggedReviews] = await Promise.all([
        supabaseAdmin.from("product_reviews").select("id, rating", { count: "exact" }),
        supabaseAdmin.from("seller_reviews").select("id, rating", { count: "exact" }),
        supabaseAdmin.from("product_reviews").select("id", { count: "exact", head: true }).eq("is_flagged", true),
      ]);

      const avgProductRating = productReviews.data?.length
        ? productReviews.data.reduce((sum: number, r: { rating: number }) => sum + (r.rating || 0), 0) / productReviews.data.length
        : 0;

      const avgSellerRating = sellerReviews.data?.length
        ? sellerReviews.data.reduce((sum: number, r: { rating: number }) => sum + (r.rating || 0), 0) / sellerReviews.data.length
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

      const { data: review, error } = await supabaseAdmin
        .from(table)
        .update({
          is_flagged: true,
          flagged_at: new Date().toISOString(),
          flagged_by: userId,
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

      const { error } = await supabaseAdmin
        .from(table)
        .update({
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          deleted_by: userId,
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
