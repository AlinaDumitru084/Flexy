Flexy - Your AI-Powered Personal Trainer
This is a Next.js project that demonstrates how to build a modern, full-stack web application acting as a smart, conversational fitness coach. Its mission is to eliminate “decision paralysis” by instantly generating personalized workout plans.

The project was created during the internship at Devidevs.

✨ Key Features
Personalized Plan Generation: Collects user data (goals, experience, equipment) to create a unique workout plan.

Conversational Interface (Chatbot): Allows natural interaction with the AI to receive the plan and request real-time adjustments.

API Routes in Next.js: Demonstrates building backend endpoints to communicate with external services (like an AI API).

Visual Exercise Guide: Each exercise includes instructions and a visual demonstration (GIF) for proper execution.

Progress Tracking: A simple, localStorage-based calendar that marks completed workout days.

Modern and Responsive Design: Clean interface built with Tailwind CSS, and a modern font, Geist, automatically optimized with next/font.

🛠️ Tech Stack Used
Framework: Next.js (App Router)

Language: TypeScript

UI: React

Styling: Tailwind CSS

AI Service: Google Gemini API (or a similar alternative)

Getting Started: How to Run the Project Locally
To run this project on your local machine, follow the steps below.

Prerequisites
Make sure you have a recent version of Node.js installed (18.x or newer).

Installation Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/AlinaDumitru084/Flexy.git
cd Flexy
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a new file in the project root named .env.local.

Add your API key for the AI service in this file.

ini
Copy
Edit
GEMINI_API_KEY=YOUR_SECRET_API_KEY_HERE
Start the development server:

bash
Copy
Edit
npm run dev
Now open http://localhost:3000 in your browser to view the app. You can start editing the code, for example by modifying app/page.tsx, and the page will automatically update.

Learn More
To learn more about the technologies used, check out the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive tutorial.

Tailwind CSS Documentation - explore all utility classes.

Deploy on Vercel
The easiest way to deploy this application is by using the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.

