// NEW Code for components/ChatInterface.tsx

"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function ChatInterface({ userDetails, initialPlan }: { userDetails: any; initialPlan: any }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [checkinStep, setCheckinStep] = useState<'feeling' | 'time' | 'chatting'>('feeling');
  const [userFeeling, setUserFeeling] = useState('');

  useEffect(() => {
    setMessages([
      { sender: 'ai', text: `Welcome! Your primary goal is **${userDetails.goal}**. Let's start with a quick check-in.\n\nHow are you feeling today?` }
    ]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, checkinStep]); // <-- Added checkinStep to trigger scrolling when buttons appear

  const handleFeelingSelect = (feeling: string) => {
    setUserFeeling(feeling);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: feeling },
      { sender: 'ai', text: 'Got it. And how much time do you have?' }
    ]);
    setCheckinStep('time');
  };

  const handleTimeSelect = async (time: number) => {
    setIsLoading(true);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `${time} minutes` }
    ]);

    const response = await fetch('/api/adapt-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeling: userFeeling, time }),
    });
    const data = await response.json();
    
    const fullPlanText = `Here is your full plan for reference:\n\n**Workout Plan:**\n${initialPlan.workout_plan.map((item: any) => `- ${item.exercise} (${item.sets}x${item.reps})`).join('\n')}`;
    setMessages(prev => [
      ...prev,
      { sender: 'ai', text: data.suggestion },
      { sender: 'ai', text: fullPlanText }
    ]);

    setIsLoading(false);
    setCheckinStep('chatting');
  };

  // Your original handleSend function
  const handleSend = async () => { /* ... your handleSend logic ... */ };

  // --- RENDER LOGIC ---
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Flexy Chat</h1>
      <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {/* This part renders all the message bubbles */}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          
          {/* This shows the "thinking..." message */}
          {isLoading && <div className="text-gray-500">Flexy is thinking...</div>}

          {/* --- THIS IS THE NEW PART --- */}
          {/* This section now renders the buttons *inside* the chat window */}
          <div className="pt-4">
            {checkinStep === 'feeling' && (
              <div className="flex justify-center gap-2">
                <Button onClick={() => handleFeelingSelect("Energized")}>Energized</Button>
                <Button onClick={() => handleFeelingSelect("A bit tired")}>A bit tired</Button>
                <Button onClick={() => handleFeelingSelect("Sore")}>Sore</Button>
              </div>
            )}

            {checkinStep === 'time' && (
              <div className="flex justify-center gap-2">
                <Button onClick={() => handleTimeSelect(15)}>15 min</Button>
                <Button onClick={() => handleTimeSelect(30)}>30 min</Button>
                <Button onClick={() => handleTimeSelect(45)}>45+ min</Button>
              </div>
            )}
          </div>
          {/* --- END OF THE NEW PART --- */}

        </div>
      </ScrollArea>

      {/* --- THIS PART IS NOW SIMPLER --- */}
      {/* This bottom section now *only* shows the final text input when it's time to chat */}
      <div className="mt-4">
        {checkinStep === 'chatting' && (
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>Send</Button>
          </div>
        )}
      </div>
    </div>
  );
}