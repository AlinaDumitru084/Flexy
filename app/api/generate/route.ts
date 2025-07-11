// app/api/generate/route.ts - USING THE CORRECT NAME FOR THE TOP MODEL

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("CRITICAL ERROR: GEMINI_API_KEY is not defined in your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { 
      bodyweight, height, sex, age, goal, experienceLevel, activityLevel, equipment,
      feeling, time 
    } = await req.json();

    // Folosim numele oficial pentru cel mai bun model disponibil: 'gemini-2.5-pro'
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        response_mime_type: "application/json",
      }
    });

    const equipmentList = Array.isArray(equipment) && equipment.length > 0 
      ? equipment.join(', ') 
      : 'Bodyweight only';

    const prompt = `
      You are a world-class fitness and nutrition coach. Generate a personalized one-day plan based on the user's data. Adapt the plan based on their feeling and available time.
      
      User Data:
      - Age: ${age}
      - Sex: ${sex}
      - Height: ${height}
      - Bodyweight: ${bodyweight}
      - Experience Level: ${experienceLevel}
      - Daily Activity Level: ${activityLevel}
      - Available Equipment: ${equipmentList}
      - Primary Goal: ${goal}
      - Today's Feeling: ${feeling}
      - Time available: ${time} minutes
      
      The JSON output should have two main keys: "workout_plan" and "nutrition_plan".
      - "workout_plan": an array of objects, each with "exercise" (string), "sets" (string), and "reps" (string).
      - "nutrition_plan": an array of objects, each with "meal" (string) and "description" (string).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("--- GEMINI'S GUARANTEED JSON RESPONSE ---", text);
    
    const parsedJson = JSON.parse(text);
    return NextResponse.json(parsedJson);

  } catch (error: any) {
    console.error("--- AN ERROR OCCURRED IN THE GENERATE API ROUTE ---", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please check the server logs." },
      { status: 500 }
    );
  }
}