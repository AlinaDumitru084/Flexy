// components/ChatInterface.tsx - FINAL AND CORRECTED CODE

"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Send, Youtube } from 'lucide-react';

// Am mutat interfața aici pentru claritate
interface Message {
  sender: 'user' | 'ai';
  text?: string;       // Text pentru mesaje simple
  type?: 'plan';       // Tip special pentru mesaje complexe
  data?: any;          // Datele pentru mesaje complexe (planul)
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
    if (scrollAreaRef.current) scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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
      
      // Salvăm planul ca un tip special de mesaj
      setMessages(prev => [...prev, { sender: 'ai', type: 'plan', data: plan }]);
      setCheckinStep('chatting');

    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error while creating your plan. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    // ... aici vom pune logica de chat Q&A mai târziu, dacă este necesar
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="text-center mb-4 relative">
        <h1 className="text-2xl font-bold">Flexy Chat</h1>
        <Link href="/progress" passHref>
            <Button variant="outline" size="sm" className="absolute top-0 right-0">View Progress</Button>
        </Link>
      </div>
      
      <ScrollArea className="flex-grow border rounded-md p-4 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`prose dark:prose-invert max-w-none rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-muted text-foreground'}`}>
                {/* --- AICI ESTE LOGICA DE AFIȘARE REPARATĂ --- */}
                {msg.type === 'plan' ? (
                  <div>
                    <ReactMarkdown>{"Here is your personalized plan for today:\n\n### Workout Plan"}</ReactMarkdown>
                    <ul className="pl-0 list-none mt-2 space-y-4">
                      {msg.data.workout_plan.map((item: any, i: number) => (
                        <li key={i} className="pl-0">
                          <strong>{item.exercise}</strong>: {item.sets} sets of {item.reps} reps (rest {item.rest}).
                          <p className="text-sm italic my-1">{item.explanation}</p>
                          <a href={item.youtube_link} target="_blank" rel="noopener noreferrer">
                            <Button variant="destructive" size="sm" className="mt-2">
                              <Youtube className="mr-2 h-4 w-4" /> Watch Video
                            </Button>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <ReactMarkdown>{"\n### Nutrition Plan"}</ReactMarkdown>
                    <ul className="pl-0 list-none mt-2">
                      {msg.data.nutrition_plan.map((item: any, i: number) => (
                        <li key={i} className="pl-0"><strong>{item.meal}</strong>: {item.description}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ReactMarkdown>{msg.text || ''}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (<div className="flex items-center justify-center text-muted-foreground p-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating your personalized plan...</div>)}
          
          <div className="pt-4">
            {checkinStep === 'feeling' && !isLoading && (<div className="flex justify-center flex-wrap gap-2"><Button variant="outline" onClick={() => handleFeelingSelect("Energized & Ready")}>Energized & Ready</Button><Button variant="outline" onClick={() => handleFeelingSelect("A bit tired")}>A bit tired</Button><Button variant="outline" onClick={() => handleFeelingSelect("Sore from last workout")}>Sore from last workout</Button></div>)}
            {checkinStep === 'time' && !isLoading && (<div className="flex justify-center flex-wrap gap-2"><Button variant="outline" onClick={() => handleTimeSelect(15)}>15 min (Quick)</Button><Button variant="outline" onClick={() => handleTimeSelect(30)}>30 min (Standard)</Button><Button variant="outline" onClick={() => handleTimeSelect(45)}>45+ min (Full session)</Button></div>)}
          </div>
        </div>
      </ScrollArea>
      
      {checkinStep === 'chatting' && (
        <div className="mt-auto pt-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question or type 'done'..." disabled={isLoading} autoComplete="off" />
            <Button type="submit" size="icon" disabled={isLoading}><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      )}
    </div>
  );
}