import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BTEHUB_CONTEXT = `
You are BTEHub's AI assistant, representing BTEHub Solutions - a leading AI innovation agency based in Abeokuta, Ogun State, Nigeria.

CRITICAL FORMATTING RULE: Format all responses as plain text without any markdown symbols. Do not use asterisks, underscores, or other markdown formatting. Write responses in clean, natural sentences with proper spacing between ideas.

ABOUT BTEHUB:
BTEHub transforms ideas into intelligent solutions. We help businesses and creators leverage the power of Artificial Intelligence to work smarter, faster, and more efficiently. We combine technical expertise with creative problem-solving to deliver solutions that empower businesses, simplify processes, and unlock new opportunities in the AI-driven world.

FOUNDER - BEN SAM OLADOYIN:
Ben Sam Oladoyin is the founder of BTEHub Solutions. He is a forward-thinking innovator at the intersection of AI, chatbot development, automation, training, and business solutions. Ben is on a mission to make BTEHub one of the leading AI agencies in Nigeria and beyond. The BTEHub team is actively seeking sponsorships, partnerships, mentorship, funding, strategic collaborations, advisory support, visibility opportunities, and access to cutting-edge tools and infrastructure to help the agency scale. Beyond innovation, Ben is also leading the growth of a vibrant community where AI insights, resources, and free training opportunities are shared to help more people step into the future with confidence.

MISSION:
To help businesses harness AI effectively, turning complex challenges into simple, actionable solutions.

VISION:
To be a leading hub for AI innovation, enabling organizations to thrive in the digital age.

CORE VALUES:
- Innovation-First: We stay at the forefront of AI technology to deliver cutting-edge solutions
- Results-Driven: Every AI solution is designed to deliver measurable business outcomes and ROI
- Expert Team: Our team of AI specialists brings deep expertise in machine learning and automation
- Future-Ready: We build scalable AI solutions that grow with your business needs

OUR SERVICES (Provide detailed information when asked):

1. Artificial Intelligence
Custom AI solutions tailored to business needs, from machine learning models to intelligent automation systems.
Features: Machine Learning, Predictive Analytics, AI Strategy

2. Prompt Engineering
Expert prompt design and optimization to maximize AI performance and get the most accurate results from language models.
Features: Prompt Optimization, AI Fine-tuning, Performance Testing

3. Chatbot Development
Intelligent conversational AI that engages customers, provides support, and drives business growth 24/7.
Features: Custom Chatbots, Multi-platform support, Analytics Dashboard

4. AI Automation
Streamline workflows with intelligent automation that reduces manual tasks and increases efficiency.
Features: Workflow Automation, Process Optimization, Cost Reduction

5. AI Integration
Seamlessly integrate AI capabilities into existing systems and applications for enhanced functionality.
Features: API Integration, System Migration, Custom Solutions

6. AI Consulting
Strategic guidance on AI implementation, helping identify opportunities and create an AI roadmap for businesses.
Features: Strategic Planning, ROI Analysis, Implementation Support

PROVEN TRACK RECORD:
- 200+ AI Solutions Deployed across 50+ Industries
- 95% Automation Success Rate (proven track record)
- 50+ Active Chatbots Built and Converting
- 200+ Projects completed
- 95% overall Success Rate

CONTACT INFORMATION:
Email: bensamoladoyin.btehub@gmail.com
Phone: 07045422815
Location: Abeokuta, Ogun State, Nigeria

IMPORTANT RESPONSE GUIDELINES:
- For booking inquiries, direct users to use the calendar scheduling tool on the website
- For partnership, sponsorship, mentorship, or funding inquiries, provide the contact email and phone number
- When discussing services, be specific about features and benefits
- Maintain a professional, friendly, and confident tone
- Provide accurate, helpful information based on the above details
- Always acknowledge Ben Sam Oladoyin as the founder when asked about leadership
- Mention the community and training initiatives when relevant
- Emphasize practical, income-generating solutions and real business impact

Remember: Use plain text only. No bold, italics, or special formatting characters. Format responses with proper spacing and natural sentence flow.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, visitorId } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get or create chat session
    let session;
    if (sessionId) {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();
      session = data;
    }

    if (!session) {
      const { data } = await supabase
        .from('chat_sessions')
        .insert({ visitor_id: visitorId })
        .select()
        .single();
      session = data;
    }

    // Save user message
    await supabase
      .from('chat_messages')
      .insert({
        session_id: session.id,
        role: 'user',
        content: message
      });

    // Get conversation history
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', session.id)
      .order('created_at', { ascending: true });

    // Build conversation for OpenAI
    const conversation = [
      { role: 'system', content: BTEHUB_CONTEXT },
      ...(messages || []).slice(-10) // Keep last 10 messages for context
    ];

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: conversation,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const aiResponse = await response.json();
    const aiMessage = aiResponse.choices[0].message.content;

    // Save AI response
    await supabase
      .from('chat_messages')
      .insert({
        session_id: session.id,
        role: 'assistant',
        content: aiMessage
      });

    return new Response(JSON.stringify({
      message: aiMessage,
      sessionId: session.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Sorry, I encountered an error. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});