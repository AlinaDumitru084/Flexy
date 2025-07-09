// components/ChatInterface.tsx - FIXED to send ALL required data to the chat API

"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function ChatInterface({ userDetails }: { userDetails: any }) {
  const router = useRouter();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  
  const [checkinStep, setCheckinStep] = useState<'feeling' | 'time' | 'generating' | 'chatting'>('feeling');
  const [userFeeling, setUserFeeling] = useState('');
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ sender: 'ai', text: `Hello again! Let's get you ready for your workout. First, how are you feeling today?` }]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleFeelingSelect = (feeling: string) => {
    setUserFeeling(feeling);
    setMessages(prev => [...prev, { sender: 'user', text: feeling }, { sender: 'ai', text: 'Got it. And how much time do you have for your workout today?' }]);
    setCheckinStep('time');
  };

  const handleTimeSelect = async (time: number) => {
    setMessages(prev => [...prev, { sender: 'user', text: `${time} minutes` }]);
    setCheckinStep('generating');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userDetails, feeling: userFeeling, time: time }),
      });

      if (!response.ok) throw new Error('Failed to generate plan.');
      const plan = await response.json();

      const workoutText = plan.workout_plan.map((item: any) => `- **${item.exercise}**: ${item.sets} sets of ${item.reps} reps`).join('\n');
      const nutritionText = plan.nutrition_plan.map((item: any) => `- **${item.meal}**: ${item.description}`).join('\n');
      const finalPlanMessage = `Here is your personalized plan for today:\n\n### Workout Plan\n${workoutText}\n\n### Nutrition Plan\n${nutritionText}\n\nLet me know if you have any questions about it!`;

      setMessages(prev => [...prev, { sender: 'ai', text: finalPlanMessage }]);
      setCheckinStep('chatting');

    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error while creating your plan. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- AICI ESTE FUNCȚIA REPARATĂ ---
  const handleSendQuestion = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    const newMessageHistory = [...messages, userMessage];
    setMessages(newMessageHistory);
    setInput('');
    setIsLoading(true);

    try {
      const lastWorkoutFeedback = localStorage.getItem('lastWorkoutFeedback');

      // Am REPARAT obiectul trimis pentru a include TOATE datele necesare
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDetails: userDetails,           // <-- Piesa lipsă, acum adăugată
          messageHistory: newMessageHistory,
          lastWorkoutFeedback: lastWorkoutFeedback
        }),
      });

      if (!response.ok) throw new Error("The AI is a bit tired, please try again.");
      
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      
    } catch (error: any) {
      setMessages(prev => [...prev, { sender: 'ai', text: error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="text-center mb-4 relative"><h1 className="text-2xl font-bold">Flexy Chat</h1><Link href="/progress" passHref className="absolute top-0 right-0"><Button variant="outline" size="sm">View Progress</Button></Link></div>
      <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (<div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`prose dark:prose-invert rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-muted text-foreground'}`}><ReactMarkdown>{msg.text}</ReactMarkdown></div></div>))}
          <div className="pt-4">{checkinStep === 'feeling' && !isLoading && (<div className="flex justify-center flex-wrap gap-2"><Button variant="outline" onClick={() => handleFeelingSelect("Energized & Ready")}>Energized & Ready</Button><Button variant="outline" onClick={() => handleFeelingSelect("A bit tired")}>A bit tired</Button><Button variant="outline" onClick={() => handleFeelingSelect("Sore from last workout")}>Sore from last workout</Button></div>)}{checkinStep === 'time' && !isLoading && (<div className="flex justify-center flex-wrap gap-2"><Button variant="outline" onClick={() => handleTimeSelect(15)}>15 min (Quick)</Button><Button variant="outline" onClick={() => handleTimeSelect(30)}>30 min (Standard)</Button><Button variant="outline" onClick={() => handleTimeSelect(45)}>45+ min (Full session)</Button></div>)}</div>
          {isLoading && (<div className="flex items-center justify-center text-muted-foreground p-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />{checkinStep === 'generating' ? 'Generating your personalized plan...' : 'Flexy is thinking...'}</div>)}
        </div>
      </ScrollArea>

      <div className="mt-auto pt-4">
        {checkinStep === 'chatting' && (
          <form onSubmit={(e) => { e.preventDefault(); handleSendQuestion(); }} className="flex space-x-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question about your plan..." disabled={isLoading} autoComplete="off" />
            <Button type="submit" size="icon" disabled={isLoading}><Send className="h-4 w-4" /></Button>
          </form>
        )}
      </div>
    </div>
  );
}