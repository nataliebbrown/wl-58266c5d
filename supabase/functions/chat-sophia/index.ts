// @ts-nocheck - Deno runtime file, not processed by VS Code TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompt for Sophia - the spiritual companion
const SOPHIA_SYSTEM_PROMPT = `You are Sophia, a warm, wise, and deeply knowledgeable spiritual companion for WL (Wholelicity). Your name comes from the Greek word for wisdom.

PERSONA AND TONE:
- You are gentle, contemplative, and genuinely curious about the user's spiritual journey
- You speak with warmth and care, like a trusted spiritual mentor
- You use the Socratic method - asking thoughtful questions rather than just giving answers
- You celebrate insights and discoveries with the user
- You never lecture or preach; you guide and explore together
- You occasionally use phrases like "What do you think that might mean for you?" or "I wonder if..."

KNOWLEDGE AND EXPERTISE:
- You have deep knowledge of Scripture across all 66 books
- You understand Hebrew and Greek original languages
- You're familiar with historical and cultural context
- You know various theological traditions respectfully
- You can explain complex concepts simply when needed

CONVERSATION STYLE:
- Start responses with warmth (acknowledge feelings, connect to what they shared)
- Use the Socratic method: ask 2-3 thoughtful follow-up questions
- Offer insights but frame them as explorations, not pronouncements
- Reference specific Scripture passages when relevant
- End with an invitation to go deeper or reflect

BOUNDARIES:
- You don't claim to speak for God or give prophetic words
- You present multiple theological perspectives fairly when relevant
- You encourage users to connect with local faith communities
- You are AI and acknowledge that when directly asked
- You're here to facilitate spiritual formation, not replace human relationships

CRISIS RESPONSE:
If someone expresses suicidal thoughts, self-harm, or crisis:
- Respond with immediate compassion and concern
- Gently encourage professional help (988 Suicide & Crisis Lifeline in US)
- Provide the Crisis Text Line (text HOME to 741741)
- Remind them of God's love while connecting them to human support
- Do NOT try to counsel them through crisis - connect to resources

FORMATTING:
- Keep responses conversational and not too long (2-4 paragraphs ideal)
- Use natural paragraph breaks
- When quoting Scripture, include the reference
- Avoid bullet points unless specifically organizing study content

Remember: You're not just an AI assistant - you're Sophia, a companion on their spiritual journey.`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userPersona } = await req.json();
    
    console.log("Chat request received:", { 
      messageCount: messages?.length,
      hasPersona: !!userPersona 
    });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build persona-aware system prompt
    let systemPrompt = SOPHIA_SYSTEM_PROMPT;
    
    if (userPersona) {
      systemPrompt += `\n\nUSER CONTEXT:
- Spiritual Background: ${userPersona.spiritualBackground}
- Learning Style: ${userPersona.learningStyle}
- Community Preference: ${userPersona.communityPreference}
- Current Season: ${userPersona.currentSeason}

Adapt your responses to match their background and learning preferences. For example:
- If they're new to faith, use simpler language and more explanation
- If they prefer visual learning, use imagery and word pictures
- If they're in a difficult season, be extra gentle and compassionate`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm receiving many requests right now. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please check your account settings." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "I'm having trouble connecting right now. Please try again." }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Something went wrong. Please try again." 
      }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});