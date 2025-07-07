// FINAL CORRECTED Code for components/ChatInterface.tsx

"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function ChatInterface({ userDetails, initialPlan }: { userDetails: any; initialPlan: any }) {
  // --- STATE MANAGEMENT (Unchanged) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [checkinStep, setCheckinStep] = useState<'feeling' | 'time' | 'chatting'>('feeling');
  const [userFeeling, setUserFeeling] = useState('');
  const [isWaitingForFeedback, setIsWaitingForFeedback] = useState(false);

  // --- All your functions are unchanged, I'll put them back here ---
  useEffect(() => {
    setMessages([
      { sender: 'ai', text: `Welcome! Your primary goal is **${userDetails.goal}**. Let's start with a quick check-in.\n\nHow are you feeling today?` }
    ]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, checkinStep, isWaitingForFeedback]); // Added feedback state to trigger scroll

  const handleFeelingSelect = (feeling: string) => {
    setUserFeeling(feeling);
    setMessages(prev => [...prev, { sender: 'user', text: feeling }, { sender: 'ai', text: 'Got it. And how much time do you have?' }]);
    setCheckinStep('time');
  };

  const handleTimeSelect = async (time: number) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: `${time} minutes` }]);
    const response = await fetch('/api/adapt-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeling: userFeeling, time }),
    });
    const data = await response.json();
    const fullPlanText = `Here is your full plan for reference:\n\n**Workout Plan:**\n${initialPlan.workout_plan.map((item: any) => `- ${item.exercise} (${item.sets}x${item.reps})`).join('\n')}\n\nWhen you're finished with your workout, just type **"done"**!`;
    setMessages(prev => [...prev, { sender: 'ai', text: data.suggestion }, { sender: 'ai', text: fullPlanText }]);
    setIsLoading(false);
    setCheckinStep('chatting');
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (input.toLowerCase().includes("done")) {
      const userDoneMessage: Message = { sender: 'user', text: input };
      setMessages(prev => [...prev, userDoneMessage]);
      setIsWaitingForFeedback(true);
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
        body: JSON.stringify({ userDetails, messageHistory: [...messages, userMessage], lastWorkoutFeedback }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackClick = (feedback: string) => {
    localStorage.setItem('lastWorkoutFeedback', feedback);
    const completedDaysString = localStorage.getItem('completedWorkoutDays');
    const completedDays = completedDaysString ? JSON.parse(completedDaysString) : [];
    const today = new Date().toISOString().split('T')[0];
    if (!completedDays.includes(today)) {
      completedDays.push(today);
    }
    localStorage.setItem('completedWorkoutDays', JSON.stringify(completedDays));
    setMessages(prev => [...prev, { sender: 'ai', text: `Got it, you felt the workout was "${feedback}". I've marked today as complete. Great job!` }]);
    setIsWaitingForFeedback(false);
  };

  // --- RENDER LOGIC ---
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="text-center mb-4 relative">
        <h1 className="text-2xl font-bold">Flexy Chat</h1>
        <Link href="/progress" passHref className="absolute top-0 right-0">
          <Button variant="outline" size="sm">View Progress</Button>
        </Link>
      </div>
      
      <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {/* Renders all the text message bubbles */}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && <div className="text-gray-500 pl-2">Flexy is thinking...</div>}

          {/* --- THIS IS THE CORRECTED SECTION --- */}
          {/* It renders all buttons *inside* the chat window, right where they belong */}
          <div className="pt-4">
            {checkinStep === 'feeling' && (
              <div className="flex justify-center gap-2">
                <Button onClick={() => handleFeelingSelect("Energized")}>Energized</Button>
                <Button onClick={() => handleFeelingSelect("A bit tired")}>A bit tired</Button>
                <Button onClick={() => handleFeelingSelect("Achy")}>Achy</Button>
              </div>
            )}

            {checkinStep === 'time' && (
              <div className="flex justify-center gap-2">
                <Button onClick={() => handleTimeSelect(15)}>15 min</Button>
                <Button onClick={() => handleTimeSelect(30)}>30 min</Button>
                <Button onClick={() => handleTimeSelect(45)}>45+ min</Button>
              </div>
            )}

            {isWaitingForFeedback && (
              <div className="text-center p-4 rounded-lg bg-gray-100">
                <h3 className="font-semibold mb-3">How did that workout feel?</h3>
                <div className="flex justify-center gap-2">
                  <Button onClick={() => handleFeedbackClick("Too Easy")}>Too Easy</Button>
                  <Button onClick={() => handleFeedbackClick("Just Right")}>Just Right</Button>
                  <Button onClick={() => handleFeedbackClick("Too Hard")}>Too Hard</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* The bottom bar is now very simple. It ONLY shows the text input when it's time to chat. */}
      <div className="mt-4">
        {checkinStep === 'chatting' && !isWaitingForFeedback && (
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question or type 'done'..."
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