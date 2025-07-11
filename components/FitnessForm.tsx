// components/FitnessForm.tsx - USING A MORE ROBUST NAVIGATION METHOD

'use client';

import { useState } from 'react';
// Am șters useRouter, deoarece folosim o metodă directă de navigare
// import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const equipmentOptions = [
  "Bodyweight",
  "Dumbbells",
  "Barbell",
  "Kettlebell",
  "Resistance Bands",
];

export default function FitnessForm() {
  // const router = useRouter(); // Nu mai avem nevoie de această linie

  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [bodyweight, setBodyweight] = useState('');
  const [goal, setGoal] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [equipment, setEquipment] = useState<string[]>([]);

  const handleEquipmentChange = (item: string) => {
    setEquipment((prev) => 
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSaveAndNavigate = (e: React.FormEvent) => {
    e.preventDefault();

    const userDetails = {
      age, sex, height, bodyweight, goal, experienceLevel, activityLevel, equipment,
    };

    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    console.log('User details saved. Navigating to /chat...'); // Mesaj de verificare

    // --- AICI ESTE MODIFICAREA CRUCIALĂ ---
    // Folosim metoda directă a browser-ului pentru a naviga.
    window.location.href = '/chat';
  };

  return (
    <form onSubmit={handleSaveAndNavigate} className="w-full space-y-12">
      {/* Restul formularului rămâne identic */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">1. Your Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label htmlFor="age">Age</Label><Input id="age" type="number" placeholder="e.g., 25" value={age} onChange={(e) => setAge(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="sex">Sex</Label><Select onValueChange={setSex} required value={sex}><SelectTrigger><SelectValue placeholder="Select your sex" /></SelectTrigger><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="height">Height (cm)</Label><Input id="height" type="number" placeholder="e.g., 180" value={height} onChange={(e) => setHeight(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="bodyweight">Bodyweight (kg)</Label><Input id="bodyweight" type="number" placeholder="e.g., 75" value={bodyweight} onChange={(e) => setBodyweight(e.target.value)} required /></div>
        </div>
      </div>
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">2. Your Fitness Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label htmlFor="experience">Experience Level</Label><Select onValueChange={setExperienceLevel} required value={experienceLevel}><SelectTrigger><SelectValue placeholder="e.g., Beginner" /></SelectTrigger><SelectContent><SelectItem value="Beginner">Beginner (0-1 years)</SelectItem><SelectItem value="Intermediate">Intermediate (1-3 years)</SelectItem><SelectItem value="Advanced">Advanced (3+ years)</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="activity">Daily Activity Level</Label><Select onValueChange={setActivityLevel} required value={activityLevel}><SelectTrigger><SelectValue placeholder="e.g., Office job" /></SelectTrigger><SelectContent><SelectItem value="Sedentary">Sedentary (office job)</SelectItem><SelectItem value="Lightly Active">Lightly Active (light walking)</SelectItem><SelectItem value="Moderately Active">Moderately Active (on feet most of day)</SelectItem><SelectItem value="Very Active">Very Active (physical job, daily exercise)</SelectItem></SelectContent></Select></div>
        </div>
        <div className="mt-6 space-y-2">
            <Label htmlFor="goal">Primary Goal</Label>
            <Select onValueChange={setGoal} required value={goal}><SelectTrigger><SelectValue placeholder="What is your main fitness goal?" /></SelectTrigger><SelectContent><SelectItem value="Lose Fat">Lose Fat / Weight Loss</SelectItem><SelectItem value="Build Muscle">Build Muscle / Hypertrophy</SelectItem><SelectItem value="Improve Endurance">Improve Endurance / Cardio</SelectItem><SelectItem value="Maintain Fitness">Maintain current fitness level</SelectItem></SelectContent></Select>
        </div>
      </div>
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">3. Your Available Equipment</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Full Gym", ...equipmentOptions].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={item} checked={equipment.includes(item)} onCheckedChange={() => handleEquipmentChange(item)} />
              <Label htmlFor={item} className="font-normal cursor-pointer">{item}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <Button type="submit" size="lg" className="w-full md:w-1/2">
          Start Conversation
        </Button>
      </div>
    </form>
  );
}