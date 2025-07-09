// app/api/generate/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("CRITICAL ERROR: GEMINI_API_KEY is not defined in your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    // --- NOU: Am adăugat noile variabile aici ---
    const { bodyweight, height, sex, age, goal, experienceLevel, activityLevel } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // --- NOU: Am adăugat noile detalii în prompt ---
    const prompt = `You are an expert fitness and nutrition coach. A user has provided their details and is asking for a personalized fitness and nutrition plan. Based on the data below, generate a comprehensive one-day plan.
User Details:
- Age: ${age}
- Sex: ${sex}
- Height: ${height}
- Bodyweight: ${bodyweight}
- Experience Level: ${experienceLevel}
- Daily Activity Level: ${activityLevel}
- Primary Goal: ${goal}

Your response MUST be in a valid JSON format, enclosed in markdown \`\`\`json brackets. Do not include any text outside of the JSON structure.
The JSON object should have two main keys: "workout_plan" and "nutrition_plan".
- "workout_plan" should be an array of objects, where each object has "exercise", "sets", and "reps" keys.
- "nutrition_plan" should be an array of objects, where each object has "meal" (e.g., Breakfast, Lunch, Dinner) and "description" keys.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("--- GEMINI'S RAW RESPONSE ---", text);

    const startIndex = text.indexOf("```json");
    const endIndex = text.lastIndexOf("```");
    
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonString = text.substring(startIndex + 7, endIndex).trim();
      const parsedJson = JSON.parse(jsonString);
      return NextResponse.json(parsedJson);
    } else {
        console.error("ERROR: No valid JSON markdown block found in Gemini's response.");
        throw new Error("Failed to parse a valid plan from the AI response.");
    }

  } catch (error: any) {
    console.error("--- AN ERROR OCCURRED IN THE GENERATE API ROUTE ---", error);
    if (error.message?.includes("429") || error.toString().includes("Too Many Requests")) {
      return NextResponse.json(
        { error: "Too many requests. The model is currently overloaded. Please wait a bit and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "An internal server error occurred while generating the plan." },
      { status: 500 }
    );
  }
}