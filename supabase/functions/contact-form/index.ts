import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, interest, message }: ContactFormRequest = await req.json();

    console.log('Received contact form submission:', { firstName, lastName, email, interest });

    // Send email to BTEHub
    const emailResponse = await resend.emails.send({
      from: "BTEHub Contact Form <onboarding@resend.dev>",
      to: ["bensamoladoyin.btehub@gmail.com"],
      subject: `New AI Project Request from ${firstName} ${lastName}`,
      html: `
        <h2>New AI Project Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>AI Project Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Project Details:</strong></p>
        <p>${message}</p>
        
        <hr>
        <p><em>This message was sent from the BTEHub contact form.</em></p>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "BTEHub <onboarding@resend.dev>",
      to: [email],
      subject: "We received your AI project request!",
      html: `
        <h2>Thank you for your interest in BTEHub's AI solutions, ${firstName}!</h2>
        <p>We have received your project request and will get back to you within 2 hours with a detailed proposal.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>AI Project Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Project Details:</strong> ${message}</p>
        
        <p>Our AI specialists will review your requirements and prepare a custom solution proposal for your business.</p>
        
        <p>Best regards,<br>
        The BTEHub Team<br>
        <a href="mailto:bensamoladoyin.btehub@gmail.com">bensamoladoyin.btehub@gmail.com</a></p>
      `,
    });

    console.log("Contact form emails sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in contact-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);