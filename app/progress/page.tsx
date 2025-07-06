// Code for /app/progress/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // This imports the calendar's default style
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProgressPage() {
  // This state will hold the list of dates to be colored in
  const [completedDays, setCompletedDays] = useState<Date[]>([]);

  useEffect(() => {
    // When the page first loads, we need to get the saved dates from the browser's memory.
    const savedDaysString = localStorage.getItem('completedWorkoutDays');
    if (savedDaysString) {
      // The dates are saved as strings, so we need to convert them back to Date objects
      const savedDates = JSON.parse(savedDaysString).map((dateStr: string) => new Date(dateStr));
      setCompletedDays(savedDates);
    }
  }, []); // The empty array [] means this effect runs only once.

  // The style for the colored-in days
  const completedDayStyle = {
    backgroundColor: '#22c55e', // A nice, motivating green color
    color: 'white',
    borderRadius: '50%',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Progress</h1>
        <DayPicker
          mode="multiple" // Allows selecting multiple days
          selected={completedDays}
          modifiers={{ completed: completedDays }} // This tells the calendar which days to style
          modifiersStyles={{ completed: completedDayStyle }} // This applies our green style
        />
        <p className="mt-4 text-center text-gray-600">
          Each green circle is a completed workout. Don't break the chain!
        </p>
      </div>
      <Link href="/chat" passHref className="mt-8">
        <Button>Back to Chat</Button>
      </Link>
    </div>
  );
}