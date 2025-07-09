// Code for app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    // <-- 1. We now receive the new feedback information!
    const { userDetails, messageHistory, lastWorkoutFeedback } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // <-- 2. We change the prompt to a "let" so we can add to it.
    let prompt = `
      You are "Flexy," a friendly, expert-level AI fitness and nutrition coach.
      Your advice should be comprehensive, safe, and based on widely accepted fitness principles.

      **User's Profile:**
      - Age: ${userDetails.age}
      - Sex: ${userDetails.sex}
      - Height: ${userDetails.height}
      - Bodyweight: ${userDetails.bodyweight}
      - Primary Goal: ${userDetails.goal}
    `;

    // <-- 3. This is our new, smarter rule!
    // If feedback exists, we add a special new section to the AI's instructions.
    if (lastWorkoutFeedback) {
      prompt += `

      **IMPORTANT CONTEXT - Recent Workout Feedback:**
      - The user reported their last workout was: "${lastWorkoutFeedback}".
      - You MUST consider this feedback in your response. For example, if they found it 'Too Hard', suggest easier exercises or lower intensity. If they found it 'Too Easy', recommend a way to make the next workout more challenging. Acknowledge their feedback in your response.
      `;
    }

    // We add the rest of the instructions like before.
    prompt += `

      **Conversation History:**
      ${messageHistory.map((msg: any) => `${msg.sender === 'user' ? 'User' : 'Flexy'}: ${msg.text}`).join('\n')}

      Based on all the information above (especially the recent feedback), provide a helpful and encouraging response to the User's last message.
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