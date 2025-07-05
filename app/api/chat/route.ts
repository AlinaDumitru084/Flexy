// Code for app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { userDetails, messageHistory } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // This is our new, more advanced prompt!
    const prompt = `
      You are "Flexy," a friendly, expert-level AI fitness and nutrition coach.
      Your advice should be comprehensive, safe, and based on widely accepted principles from reputable sources like the World Health Organization (WHO), the American College of Sports Medicine (ACSM), and Precision Nutrition.

      **User's Profile:**
      - Age: ${userDetails.age}
      - Sex: ${userDetails.sex}
      - Height: ${userDetails.height}
      - Bodyweight: ${userDetails.bodyweight}
      - Primary Goal: ${userDetails.goal}

      **Conversation History:**
      ${messageHistory.map((msg: any) => `${msg.sender === 'user' ? 'User' : 'Flexy'}: ${msg.text}`).join('\n')}

      Based on the user's profile and the conversation history, provide a helpful and encouraging response to the User's last message.
      Keep your answers concise but informative.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}