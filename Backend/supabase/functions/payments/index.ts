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
    const path = url.pathname.replace("/payments", "");
    const method = req.method;

    // GET /payments/transactions - Get all transactions
    if (method === "GET" && path === "/transactions") {
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const status = url.searchParams.get("status");
      const offset = (page - 1) * limit;

      let query = supabaseClient
        .from("transactions")
        .select(`
          *,
          seller:profiles!transactions_seller_id_fkey(id, full_name, email),
          buyer:profiles!transactions_buyer_id_fkey(id, full_name, email)
        `, { count: "exact" });

      if (status && ["held", "completed", "disputed", "refunded"].includes(status)) {
        query = query.eq("status", status);
      }

      const { data: transactions, error, count } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          transactions,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /payments/stats - Get payment statistics
    if (method === "GET" && path === "/stats") {
      const { data: heldTransactions } = await supabaseClient
        .from("transactions")
        .select("amount")
        .eq("status", "held");

      const { data: pendingPayouts } = await supabaseClient
        .from("transactions")
        .select("amount")
        .eq("status", "pending_payout");

      const { data: disputedTransactions } = await supabaseClient
        .from("transactions")
        .select("amount")
        .eq("status", "disputed");

      const totalInEscrow = (heldTransactions || []).reduce((sum, t) => sum + (t.amount || 0), 0);
      const totalPendingPayouts = (pendingPayouts || []).reduce((sum, t) => sum + (t.amount || 0), 0);
      const totalDisputed = (disputedTransactions || []).reduce((sum, t) => sum + (t.amount || 0), 0);

      return new Response(
        JSON.stringify({
          total_in_escrow: totalInEscrow,
          pending_payouts: totalPendingPayouts,
          disputed_funds: totalDisputed,
          held_count: heldTransactions?.length || 0,
          disputed_count: disputedTransactions?.length || 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /payments/:id - Get single transaction details
    if (method === "GET" && path.startsWith("/") && path !== "/transactions" && path !== "/stats") {
      const transactionId = path.substring(1);

      const { data: transaction, error } = await supabaseClient
        .from("transactions")
        .select(`
          *,
          seller:profiles!transactions_seller_id_fkey(id, full_name, email, phone),
          buyer:profiles!transactions_buyer_id_fkey(id, full_name, email, phone),
          product:products(id, name, price)
        `)
        .eq("id", transactionId)
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(transaction), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /payments/release - Release escrow funds
    if (method === "POST" && path === "/release") {
      const { transaction_id } = await req.json();

      if (!transaction_id) {
        return new Response(JSON.stringify({ error: "transaction_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: transaction, error } = await supabaseClient
        .from("transactions")
        .update({
          status: "completed",
          released_at: new Date().toISOString(),
          released_by: user.id,
        })
        .eq("id", transaction_id)
        .eq("status", "held")
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Escrow funds released successfully",
          transaction,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /payments/refund - Refund transaction
    if (method === "POST" && path === "/refund") {
      const { transaction_id, reason } = await req.json();

      if (!transaction_id || !reason) {
        return new Response(
          JSON.stringify({ error: "transaction_id and reason are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: transaction, error } = await supabaseClient
        .from("transactions")
        .update({
          status: "refunded",
          refunded_at: new Date().toISOString(),
          refunded_by: user.id,
          refund_reason: reason,
        })
        .eq("id", transaction_id)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Transaction refunded successfully",
          transaction,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST /payments/resolve-dispute - Resolve a disputed transaction
    if (method === "POST" && path === "/resolve-dispute") {
      const { transaction_id, resolution, winner } = await req.json();

      if (!transaction_id || !resolution || !winner) {
        return new Response(
          JSON.stringify({ error: "transaction_id, resolution, and winner are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const newStatus = winner === "buyer" ? "refunded" : "completed";

      const { data: transaction, error } = await supabaseClient
        .from("transactions")
        .update({
          status: newStatus,
          dispute_resolved_at: new Date().toISOString(),
          dispute_resolved_by: user.id,
          dispute_resolution: resolution,
          dispute_winner: winner,
        })
        .eq("id", transaction_id)
        .eq("status", "disputed")
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({
          message: "Dispute resolved successfully",
          transaction,
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
