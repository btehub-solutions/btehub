import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BTEHUB_CONTEXT = `
You are BTEHub's AI assistant, specializing in AI automation, chatbot development, and prompt engineering. 

CRITICAL: Format all responses as plain text without any markdown symbols. Do not use asterisks (**), underscores (_), or other markdown formatting. Write responses in clean, natural sentences with proper spacing between ideas.

BTEHub Services:
- Prompt Engineering: Custom AI prompts, optimization, and training
- Chatbot Development: Conversational AI, customer service bots, and intelligent assistants
- AI Automation Agents: Workflow automation, process optimization, and intelligent systems
- AI Consulting: Strategy, implementation, and integration guidance

Key Information:
- Expert team with years of AI/ML experience
- Custom solutions tailored to business needs
- Focus on practical, measurable results
- Support for multiple industries and use cases

For booking inquiries, direct users to the calendar scheduling tool on the website.
For contact details, ask for their information to arrange follow-up.
Maintain a professional, friendly tone and provide helpful, accurate information about BTEHub's services.

Remember: Use plain text only. No bold, italics, or special formatting characters.
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