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
  const [messages, setMessages] = useState<Message[]>([]); // <-- 1. Start with an empty message list
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [checkinStep, setCheckinStep] = useState<'feeling' | 'time' | 'chatting'>('feeling');
  const [userFeeling, setUserFeeling] = useState('');

  // --- NEW: This useEffect now starts the conversation ---
  useEffect(() => {
    // When the component loads, the AI asks the first question.
    setMessages([
      { sender: 'ai', text: `Welcome! Your primary goal is **${userDetails.goal}**. Let's start with a quick check-in.\n\nHow are you feeling today?` }
    ]);
  }, []); // This runs only once on load

  // Auto-scroll logic (unchanged)
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // --- MODIFIED CHECK-IN FUNCTIONS ---
  const handleFeelingSelect = (feeling: string) => {
    setUserFeeling(feeling);
    // Add the user's choice and the AI's next question to the chat history
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: feeling },
      { sender: 'ai', text: 'Got it. And how much time do you have?' }
    ]);
    setCheckinStep('time'); // Move to the next step
  };

  const handleTimeSelect = async (time: number) => {
    setIsLoading(true);
    // Add the user's choice to the chat history
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
    
    // Add the AI's suggestion and the plan to the chat
    const fullPlanText = `Here is your full plan for reference:\n\n**Workout Plan:**\n${initialPlan.workout_plan.map((item: any) => `- ${item.exercise} (${item.sets}x${item.reps})`).join('\n')}`;
    setMessages(prev => [
      ...prev,
      { sender: 'ai', text: data.suggestion },
      { sender: 'ai', text: fullPlanText }
    ]);

    setIsLoading(false);
    setCheckinStep('chatting'); // FINALLY, switch to normal chat mode
  };

  // --- Normal chat functions ---
  // IMPORTANT: I've pasted your original handleSend and handleFeedbackClick functions back in here.
  const handleSend = async () => {
    if (!input.trim()) return;

    if (input.toLowerCase().includes("done")) {
      const userDoneMessage: Message = { sender: 'user', text: input };
      setMessages(prev => [...prev, userDoneMessage]);
      // NOTE: We don't have isWaitingForFeedback anymore, but you can add it back if you want that feature.
      setInput('');
      return;
    }

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const lastWorkoutFeedback = localStorage.getItem('lastWorkoutFeedback');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDetails: userDetails,
          messageHistory: [...messages, userMessage],
          lastWorkoutFeedback: lastWorkoutFeedback
        }),
      });
      const data = await response.json();
      const aiMessage: Message = { sender: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDER LOGIC ---
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

      {/* This bottom section now only shows the correct interactive elements */}
      <div className="mt-4">
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