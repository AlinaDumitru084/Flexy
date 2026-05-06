# Flexy - AI Personal Trainer

Flexy is a Next.js web app built as part of an internship at Devidevs. The goal was to eliminate "decision paralysis" around workouts — instead of figuring out what to do at the gym, you tell the app your goals and it builds a personalized plan for you instantly.

## Features

Personalized workout plans — collects your goals, experience level and available equipment to generate a plan tailored to you.

Chat interface — interact naturally with the AI to receive your plan and request adjustments in real time.

Next.js API Routes — backend endpoints that communicate with external AI services, keeping API keys server-side.

Exercise guides — each exercise includes instructions and a GIF demonstration for correct execution.

Progress tracking — a simple calendar based on localStorage that marks completed training days.

Responsive UI — clean interface built with Tailwind CSS and the Geist font, auto-optimized with next/font.

## Tech Stack

Framework: Next.js (App Router)  
Language: TypeScript  
UI: React  
Styling: Tailwind CSS  
AI: Google Gemini API

## Running locally

You'll need Node.js 18 or newer.

Clone the repo and navigate into it, then install dependencies:

    git clone https://github.com/AlinaDumitru084/Flexy.git
    cd Flexy
    npm install

Create a .env.local file in the root and add your API key:

    GEMINI_API_KEY=your_api_key_here

Start the dev server:

    npm run dev

Open http://localhost:3000 and you're good to go.