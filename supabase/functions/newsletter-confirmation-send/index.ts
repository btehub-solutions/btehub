import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendConfirmationRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SendConfirmationRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate confirmation token
    const confirmationToken = crypto.randomUUID();

    // Check if subscription already exists
    const { data: existingSub, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (checkError) throw checkError;

    let subscriptionId;

    if (existingSub) {
      if (existingSub.status === 'confirmed') {
        return new Response(
          JSON.stringify({ message: "Email already confirmed" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Update existing subscription with new token
      const { error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({ confirmation_token: confirmationToken })
        .eq('email', email);

      if (updateError) throw updateError;
      subscriptionId = existingSub.id;
    } else {
      // Create new subscription
      const { data: newSub, error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          confirmation_token: confirmationToken,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) throw insertError;
      subscriptionId = newSub.id;
    }

    // Send confirmation email
    const confirmationUrl = `${supabaseUrl}/functions/v1/newsletter-confirm?token=${confirmationToken}`;
    
    const emailResponse = await resend.emails.send({
      from: "BTEHub Newsletter <newsletter@btehub.com>",
      to: [email],
      subject: "Confirm your BTEHub newsletter subscription",
      html: generateConfirmationEmail(confirmationUrl),
    });

    console.log("Confirmation email sent:", emailResponse);

    // Track analytics
    await supabase
      .from('newsletter_analytics')
      .insert({
        email,
        event_type: 'confirmation_sent',
        metadata: { subscription_id: subscriptionId }
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Confirmation email sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Confirmation send error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateConfirmationEmail(confirmationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Subscription - BTEHub Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 680px; margin: 0 auto; padding: 24px;">
        <div style="background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 24px;">
          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div style="width: 42px; height: 42px; border-radius: 12px; background: #0f172a; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 18px;">B</div>
            <div>
              <div style="font-size: 18px; font-weight: 700; color: #0f172a;">BTEHub Newsletter</div>
              <div style="font-size: 12px; color: #64748b;">Learn AI • Build Solutions • Create Income</div>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          
          <!-- Content -->
          <div style="line-height: 1.6; color: #0f172a;">
            <h1 style="color: #0f172a; margin-bottom: 16px;">Confirm Your Subscription</h1>
            <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
              Thank you for signing up for the BTEHub newsletter! Please confirm your email address to start receiving our weekly AI insights.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${confirmationUrl}" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Confirm Subscription
              </a>
            </div>
            
            <p style="font-size: 14px; color: #94a3b8; margin-top: 24px;">
              If you didn't sign up for this newsletter, you can safely ignore this email.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          
          <!-- Footer -->
          <div style="text-align: center;">
            <p style="font-size: 12px; color: #64748b; margin: 12px 0;">— BTEHub Team</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

serve(handler);