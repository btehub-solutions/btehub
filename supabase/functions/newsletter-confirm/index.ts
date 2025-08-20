import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Missing confirmation token", { 
      status: 400,
      headers: corsHeaders 
    });
  }

  try {
    // Find subscription by confirmation token
    const { data: subscription, error: fetchError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('confirmation_token', token)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!subscription) {
      return new Response(
        generateHTML("Invalid Token", "This confirmation link is invalid or has expired."),
        {
          status: 404,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    if (subscription.status === 'confirmed') {
      return new Response(
        generateHTML("Already Confirmed", "Your email subscription is already confirmed. Thank you!"),
        {
          status: 200,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
        confirmation_token: null
      })
      .eq('id', subscription.id);

    if (updateError) throw updateError;

    // Track analytics
    await supabase
      .from('newsletter_analytics')
      .insert({
        email: subscription.email,
        event_type: 'confirmed',
        metadata: { confirmed_at: new Date().toISOString() }
      });

    return new Response(
      generateHTML(
        "Subscription Confirmed!", 
        "Thank you for confirming your email! You'll now receive our weekly AI newsletter."
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Confirmation error:", error);
    return new Response(
      generateHTML("Error", "An error occurred while confirming your subscription."),
      {
        status: 500,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      }
    );
  }
};

function generateHTML(title: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - BTEHub Newsletter</title>
      <style>
        body { margin: 0; padding: 40px 20px; font-family: Arial, sans-serif; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .logo { width: 60px; height: 60px; background: #0f172a; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        h1 { color: #0f172a; margin: 20px 0; }
        p { color: #64748b; line-height: 1.6; margin-bottom: 30px; }
        .btn { display: inline-block; background: #0f172a; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">B</div>
        <h1>${title}</h1>
        <p>${message}</p>
        <a href="/" class="btn">Back to BTEHub</a>
      </div>
    </body>
    </html>
  `;
}

serve(handler);