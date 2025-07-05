// Code for app/chat/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  const [initialData, setInitialData] = useState<{ userDetails: any; plan: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    const initialPlanString = localStorage.getItem("initialPlan");

    if (userDetailsString && initialPlanString) {
      setInitialData({
        userDetails: JSON.parse(userDetailsString),
        plan: JSON.parse(initialPlanString),
      });
    }
    setIsLoading(false);
  }, []);

  // --- NEW CODE BLOCK: The recipe for our "Start Over" button ---
  // This function tells the browser what to do when the button is clicked.
  const handleStartOver = () => {
    localStorage.clear(); // Erases the browser's short-term memory
    router.push('/');     // Sends the user back to the welcome screen
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading Chat...</div>;
  }

  if (!initialData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="mb-4">No plan found. Please generate a plan first.</p>
        <Link href="/" className="text-blue-500 underline">
          Go back home
        </Link>
      </div>
    );
  }

  // --- MODIFIED RETURN: We wrap everything in a container and add the button ---
  return (
    // This div acts as a frame so we can place the button in the corner
    <div className="relative h-screen">
      <button 
        onClick={handleStartOver}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm z-10 hover:bg-red-600 transition-colors"
      >
        Start Over
      </button>
      
      {/* The chat interface stays exactly the same */}
      <ChatInterface userDetails={initialData.userDetails} initialPlan={initialData.plan} />
    </div>
  );
}