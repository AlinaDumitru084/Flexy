// app/api/generate/route.ts - TARGETED YOUTUBE SEARCH

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

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const equipmentList = Array.isArray(equipment) && equipment.length > 0 
      ? equipment.join(', ') 
      : 'Bodyweight only';

    // --- AICI ESTE PROMPTUL MODIFICAT ---
    const prompt = `
      You are a world-class fitness and nutrition coach. Generate a personalized one-day plan based on the user's data.
      Adapt the plan based on their feeling and available time.
      
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
      
      The JSON output must have two main keys: "workout_plan" and "nutrition_plan".
      - "workout_plan": An array of objects. Each object must have "exercise", "sets", "reps", "rest", "explanation", and a "youtube_link".
      - "youtube_link" MUST be a valid YouTube search URL that finds a demonstration video for the specific exercise ONLY from the "FitnessBlender" channel. The URL format should be: "https://www.youtube.com/results?search_query=fitnessblender+" followed by the exercise name (e.g., "https://www.youtube.com/results?search_query=fitnessblender+dumbbell+squat").
      - "nutrition_plan": A list of objects, each with "meal" and a very concise "description".
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