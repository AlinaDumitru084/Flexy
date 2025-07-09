// app/chat/page.tsx - VERSIUNEA FINALĂ, SINCRONIZATĂ

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ChatInterface } from "@/components/ChatInterface"; // Importăm componenta actualizată

export default function ChatPage() {
  // --- MODIFICAT: State-ul acum salvează doar userDetails, nu un obiect complex. ---
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // --- MODIFICAT: Citim doar userDetails. ---
    const userDetailsString = localStorage.getItem("userDetails");

    if (userDetailsString) {
      setUserDetails(JSON.parse(userDetailsString));
    }
    setIsLoading(false);
  }, []);

  const handleStartOver = () => {
    localStorage.clear();
    router.push('/');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-background">Loading Chat...</div>;
  }

  // --- MODIFICAT: Verificarea se face acum direct pe userDetails. ---
  if (!userDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-background">
        <p className="mb-4 text-lg">No user details found.</p>
        <p className="mb-4 text-muted-foreground">Please fill out your details first to start the conversation.</p>
        <Link href="/details" className="text-blue-500 underline">
          Go to Details Page
        </Link>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <button 
        onClick={handleStartOver}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm z-10 hover:bg-red-600 transition-colors"
      >
        Start Over
      </button>
      
      {/* --- MODIFICAT: Trimitem DOAR userDetails către componentă. --- */}
      <ChatInterface userDetails={userDetails} />
    </div>
  );
}