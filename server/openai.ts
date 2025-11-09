import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// Reference: javascript_openai_ai_integrations blueprint
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export interface AircraftAnalysis {
  aircraftType: "fighter" | "commercial" | "helicopter" | "private" | "cargo";
  reasoning: string;
  matchingTags: string[];
}

export async function analyzeAircraftPrompt(prompt: string): Promise<AircraftAnalysis> {
  try {
    // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert aerospace engineer and aircraft designer. Analyze user descriptions of aircraft and determine the best matching aircraft type. 
          
Available types:
- fighter: Military fighter jets, combat aircraft, interceptors
- commercial: Passenger airlines, large commercial jets
- helicopter: Rotary-wing aircraft, choppers
- private: Small private aircraft, business jets, light aircraft
- cargo: Cargo planes, transport aircraft, freighters

Provide a detailed analysis explaining why this type matches, and list relevant tags from the description.`
        },
        {
          role: "user",
          content: `Analyze this aircraft description and provide your expert assessment:\n\n"${prompt}"\n\nRespond with a JSON object containing: aircraftType (one of: fighter, commercial, helicopter, private, cargo), reasoning (detailed explanation), and matchingTags (array of relevant descriptive tags).`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content) as AircraftAnalysis;
    
    if (!parsed.aircraftType || !parsed.reasoning) {
      throw new Error("Invalid AI response format");
    }

    return parsed;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze aircraft description");
  }
}
