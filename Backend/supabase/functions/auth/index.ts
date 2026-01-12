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

    const url = new URL(req.url);
    const path = url.pathname.replace("/auth", "");
    const method = req.method;

    // POST /auth/admin-login - Admin login with role verification
    if (method === "POST" && path === "/admin-login") {
      const { email, password } = await req.json();

      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: "Email and password are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Sign in the user
      const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Auth error:", authError);
        return new Response(
          JSON.stringify({ 
            error: authError.message,
            details: "Authentication failed"
          }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (!authData.user) {
        return new Response(
          JSON.stringify({ error: "No user data returned" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("User authenticated:", authData.user.id);

      // Check if user has super_admin role
      // Use service role to bypass RLS
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      );

      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("role, email, full_name")
        .eq("id", authData.user.id)
        .single();

      console.log("Profile query result:", { profile, error: profileError });

      if (profileError) {
        console.error("Profile query error:", profileError);
        
        // If profile doesn't exist, create one with pending status
        if (profileError.code === "PGRST116") {
          const { error: insertError } = await supabaseAdmin
            .from("profiles")
            .insert({
              id: authData.user.id,
              email: authData.user.email,
              role: "buyer", // Default role
              full_name: authData.user.user_metadata?.full_name || null,
            });

          if (insertError) {
            console.error("Failed to create profile:", insertError);
          }

          return new Response(
            JSON.stringify({ 
              error: "Profile not found. A basic profile has been created. Please contact administrator to grant super_admin access.",
              user_id: authData.user.id
            }),
            {
              status: 403,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            error: "Failed to fetch profile",
            details: profileError.message,
            code: profileError.code
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (!profile) {
        return new Response(
          JSON.stringify({ 
            error: "No profile found for this user",
            user_id: authData.user.id
          }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (profile.role !== "super_admin") {
        console.log("Access denied. User role:", profile.role);
        return new Response(
          JSON.stringify({ 
            error: "Access denied. Super admin role required.",
            current_role: profile.role,
            user_id: authData.user.id
          }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("Admin login successful for:", profile.email);

      return new Response(
        JSON.stringify({
          message: "Login successful",
          user: {
            id: authData.user.id,
            email: profile.email,
            role: profile.role,
            full_name: profile.full_name,
          },
          session: authData.session,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Internal server error",
        stack: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
