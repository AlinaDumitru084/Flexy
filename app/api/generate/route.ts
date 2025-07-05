import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// IMPORTANT! Do not client-side this, it will expose your API key.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  // This is the main "try" block. It will try to do everything.
  // If ANY part fails, it will jump to the "catch" block at the end.
  try {
    // Get the user's data from the request body
    const { bodyweight, height, sex, age, goal } = await req.json();

    // For simplicity, we'll use gemini-1.5-flash.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // This is the core of our chatbot. We create a detailed prompt
    // that instructs the AI on its persona, the user's details,
    // and the desired JSON output format.
    const prompt = `
      You are an expert fitness and nutrition coach.
      A user has provided their details and is asking for a personalized fitness and nutrition plan.
      Based on the data below, generate a comprehensive one-day plan.

      User Details:
      - Age: ${age}
      - Sex: ${sex}
      - Height: ${height}
      - Bodyweight: ${bodyweight}
      - Primary Goal: ${goal}

      Your response MUST be in a valid JSON format. Do not include any text outside of the JSON structure.
      The JSON object should have two main keys: "workout_plan" and "nutrition_plan".
      - "workout_plan" should be an array of objects, where each object has "exercise", "sets", and "reps" keys.
      - "nutrition_plan" should be an array of objects, where each object has "meal" (e.g., Breakfast, Lunch, Dinner) and "description" keys.

      Example of the required JSON output format:
      {
        "workout_plan": [
          {
            "exercise": "Squats",
            "sets": "3",
            "reps": "10-12"
          }
        ],
        "nutrition_plan": [
          {
            "meal": "Breakfast",
            "description": "Oatmeal with berries and a scoop of protein powder."
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // --- Start of the JSON parsing logic ---
    // Find the start and end of the JSON object in the response text
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      // Extract just the JSON string part
      const jsonString = text.substring(startIndex, endIndex + 1);
      
      // Turn the clean JSON string into a real JavaScript object
      const parsedJson = JSON.parse(jsonString);
      
      // Send the beautiful, clean object back to the website
      return NextResponse.json(parsedJson);
    } else {
      // If we couldn't find a JSON object in the text, we should log it and fail.
      console.error("No valid JSON object found in Gemini's response. Raw text:", text);
      throw new Error("Failed to get a valid plan from the AI.");
    }

  } catch (error) {
    // This is the "Plan B". If anything in the "try" block failed,
    // we land here. We log the error in the terminal and send a
    // generic error message back to the website.
    console.error("An error occurred in the generate API route:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}