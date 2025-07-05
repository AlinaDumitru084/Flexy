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
  // --- STATE MANAGEMENT ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // <-- NEW: State to manage the check-in flow
  const [checkinStep, setCheckinStep] = useState<'feeling' | 'time' | 'chatting'>('feeling');
  const [userFeeling, setUserFeeling] = useState('');

  // Auto-scroll logic (unchanged)
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // --- NEW CHECK-IN FUNCTIONS ---
  const handleFeelingSelect = (feeling: string) => {
    setUserFeeling(feeling);
    setMessages([{ sender: 'ai', text: `You're feeling: ${feeling}. Got it.` }]);
    setCheckinStep('time'); // Move to the next step
  };

  const handleTimeSelect = async (time: number) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'ai', text: `And you have ${time} minutes.`}]);

    // Call our new, simple API
    const response = await fetch('/api/adapt-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeling: userFeeling, time }),
    });
    const data = await response.json();
    
    // Add the AI's suggestion and the original plan to the chat
    const suggestionMessage: Message = { sender: 'ai', text: data.suggestion };
    const planMessage: Message = { sender: 'ai', text: `Here is your full plan for reference:\n\n**Workout Plan:**\n${initialPlan.workout_plan.map((item: any) => `- ${item.exercise} (${item.sets}x${item.reps})`).join('\n')}` };
    setMessages(prev => [...prev, suggestionMessage, planMessage]);

    setIsLoading(false);
    setCheckinStep('chatting'); // FINALLY, switch to normal chat mode
  };

  // --- Normal chat functions (unchanged, but not used until check-in is done) ---
  const handleSend = async () => { /* ... your existing handleSend logic ... */ };

  // --- THE RENDER LOGIC ---
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Flexy Chat</h1>
      <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && <div className="text-gray-500">Flexy is thinking...</div>}
        </div>
      </ScrollArea>

      {/* -- NEW: This whole block conditionally renders the UI based on the checkinStep -- */}
      <div className="mt-4">
        {checkinStep === 'feeling' && (
          <div className="text-center p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold mb-3">How are you feeling today?</h3>
            <div className="flex justify-center gap-2">
              <Button onClick={() => handleFeelingSelect("Energized")}>Energized</Button>
              <Button onClick={() => handleFeelingSelect("A bit tired")}>A bit tired</Button>
              <Button onClick={() => handleFeelingSelect("Sore")}>Sore</Button>
            </div>
          </div>
        )}

        {checkinStep === 'time' && (
          <div className="text-center p-4 rounded-lg bg-gray-100">
            <h3 className="font-semibold mb-3">How much time do you have?</h3>
            <div className="flex justify-center gap-2">
              <Button onClick={() => handleTimeSelect(15)}>15 min</Button>
              <Button onClick={() => handleTimeSelect(30)}>30 min</Button>
              <Button onClick={() => handleTimeSelect(45)}>45+ min</Button>
            </div>
          </div>
        )}

        {checkinStep === 'chatting' && (
          // This is your original chat input, which only shows after the check-in
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