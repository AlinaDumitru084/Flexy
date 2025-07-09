// Code for /app/api/adapt-plan/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { feeling, time } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
      You are an encouraging fitness coach. A user is starting their day.
      Based on how they feel and how much time they have, give them a short, single-sentence recommendation for their workout.

      User's context:
      - How they feel: "${feeling}"
      - Time available: "${time} minutes"

      Your Task:
      - If they feel 'sore' or 'tired', suggest a recovery or light activity.
      - If they feel 'energized', suggest they tackle their main workout.
      - Keep your response to a single, encouraging sentence. Do not include the exercises themselves.

      Example: "Awesome, you're feeling energized and have plenty of time! Let's get to your main workout."
      Example: "Got it, you're feeling sore. A light 15-minute stretching session would be perfect for recovery today."
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ suggestion: text });

  } catch (error) {
    console.error("Error in adapt-plan API:", error);
    return NextResponse.json(
      { error: "Sorry, I had a problem thinking of a suggestion." },
      { status: 500 }
    );
  }
}