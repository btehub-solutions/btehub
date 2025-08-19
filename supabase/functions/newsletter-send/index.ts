import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendNewsletterRequest {
  issueId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { issueId }: SendNewsletterRequest = await req.json();

    // Fetch the newsletter issue
    const issueResponse = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/newsletter_issues?id=eq.${issueId}&select=*`,
      {
        headers: {
          apikey: Deno.env.get("SUPABASE_ANON_KEY") || "",
          authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
      }
    );

    const issues = await issueResponse.json();
    if (!issues || issues.length === 0) {
      throw new Error("Newsletter issue not found");
    }

    const issue = issues[0];

    // Fetch confirmed subscribers
    const subscribersResponse = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/newsletter_subscriptions?status=eq.confirmed&select=email`,
      {
        headers: {
          apikey: Deno.env.get("SUPABASE_ANON_KEY") || "",
          authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
      }
    );

    const subscribers = await subscribersResponse.json();
    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No confirmed subscribers found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate HTML content
    const htmlContent = generateNewsletterHTML(issue);

    // Send emails in batches
    const batchSize = 90;
    const emails = subscribers.map((sub: any) => sub.email);
    const results = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      try {
        const emailResponse = await resend.emails.send({
          from: "BTEHub Newsletter <newsletter@btehub.com>",
          to: batch,
          subject: issue.title,
          html: htmlContent,
        });

        results.push({ success: true, count: batch.length, data: emailResponse });
      } catch (error) {
        console.error("Batch send error:", error);
        results.push({ success: false, count: batch.length, error: error.message });
      }
    }

    // Update issue status to published
    await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/newsletter_issues?id=eq.${issueId}`,
      {
        method: "PATCH",
        headers: {
          apikey: Deno.env.get("SUPABASE_ANON_KEY") || "",
          authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "published",
          published_at: new Date().toISOString(),
        }),
      }
    );

    const totalSent = results.filter(r => r.success).reduce((sum, r) => sum + r.count, 0);
    const totalFailed = results.filter(r => !r.success).reduce((sum, r) => sum + r.count, 0);

    return new Response(
      JSON.stringify({
        success: true,
        totalSent,
        totalFailed,
        results,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Newsletter send error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateNewsletterHTML(issue: any): string {
  const content = issue.content;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${issue.title}</title>
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
            <h1 style="color: #0f172a; margin-bottom: 16px;">${issue.title}</h1>
            ${issue.subtitle ? `<p style="font-size: 18px; color: #64748b; margin-bottom: 24px;">${issue.subtitle}</p>` : ''}
            
            ${content.highlights ? `
            <div style="margin-bottom: 24px;">
              <h2 style="color: #0f172a; font-size: 20px; margin-bottom: 16px;">🚀 This Week's AI Highlights</h2>
              <ul style="padding-left: 0; list-style: none;">
                ${content.highlights.map((highlight: string) => `
                  <li style="margin-bottom: 12px; padding-left: 20px; position: relative;">
                    <span style="position: absolute; left: 0; color: #3b82f6; font-weight: bold;">•</span>
                    ${highlight}
                  </li>
                `).join('')}
              </ul>
            </div>
            ` : ''}
            
            ${content.insights ? `
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <h3 style="color: #0f172a; margin-bottom: 12px;">💡 Why This Matters</h3>
              <p style="color: #475569; margin: 0;">${content.insights}</p>
            </div>
            ` : ''}
            
            ${content.callToAction ? `
            <div style="text-align: center; margin: 24px 0;">
              <p style="color: #64748b; font-style: italic; margin-bottom: 16px;">${content.callToAction}</p>
            </div>
            ` : ''}
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          
          <!-- Footer -->
          <div style="text-align: center;">
            <p style="font-size: 12px; color: #64748b; margin: 12px 0;">— BTEHub Team</p>
            <p style="font-size: 11px; color: #94a3b8; margin: 6px 0;">
              You are receiving this because you subscribed on our website. 
              <a href="{{UNSUBSCRIBE_URL}}" style="color: #0ea5e9; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

serve(handler);