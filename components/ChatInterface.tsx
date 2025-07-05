// Code for components/ChatInterface.tsx

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

// This function formats the plan into a nice string
const formatPlan = (plan: any): string => {
  let planText = "Here is your personalized plan:\n\n**Workout Plan:**\n";
  plan.workout_plan.forEach((item: any) => {
    planText += `- ${item.exercise} (Sets: ${item.sets}, Reps: ${item.reps})\n`;
  });
  planText += "\n**Nutrition Plan:**\n";
  plan.nutrition_plan.forEach((item: any) => {
    planText += `- ${item.meal}: ${item.description}\n`;
  });
  planText += "\nFeel free to ask me any questions or for modifications!";
  return planText;
};

export function ChatInterface({ userDetails, initialPlan }: { userDetails: any; initialPlan: any }) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: `Hello! I've analyzed your details. ${formatPlan(initialPlan)}` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to the bottom when a new message appears
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userDetails: userDetails,
          messageHistory: [...messages, userMessage] 
        }),
      });

      const data = await response.json();
      const aiMessage: Message = { sender: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up question..."
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
}