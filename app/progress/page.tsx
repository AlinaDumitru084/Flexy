

"use client";

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProgressPage() {
  
  const [completedDays, setCompletedDays] = useState<Date[]>([]);

  useEffect(() => {
    
    const savedDaysString = localStorage.getItem('completedWorkoutDays');
    if (savedDaysString) {
      
      const savedDates = JSON.parse(savedDaysString).map((dateStr: string) => new Date(dateStr));
      setCompletedDays(savedDates);
    }
  }, []); 

  
  const completedDayStyle = {
    backgroundColor: '#22c55e', 
    color: 'black',
    borderRadius: '50%',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black-900">Your Progress</h1>
        <DayPicker
          mode="multiple" 
          selected={completedDays}
          modifiers={{ completed: completedDays }} 
          modifiersStyles={{ completed: completedDayStyle }} 
        />
        <p className="mt-4 text-center text-black-800">
          Each green circle is a completed workout. Don&apos;t break the chain!
        </p>
      </div>
      <Link href="/chat" passHref className="mt-8">
        <Button>Back to Chat</Button>
      </Link>
    </div>
  );
}