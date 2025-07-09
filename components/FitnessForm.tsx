// components/FitnessForm.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { Loader2 } from 'lucide-react';

interface Plan {
  workout_plan: any[];
  nutrition_plan: any[];
}

const equipmentOptions = [
  "Bodyweight",
  "Dumbbells",
  "Barbell",
  "Kettlebell",
  "Resistance Bands",
];

export default function FitnessForm() {
  const router = useRouter();

  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [bodyweight, setBodyweight] = useState('');
  const [goal, setGoal] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [equipment, setEquipment] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEquipmentChange = (item: string) => {
    setEquipment((prev) => 
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Adaugă aici logica de trimitere la API, pe care am avut-o înainte.
    // Deocamdată ne concentrăm doar pe design.
    try {
      // Simulăm o încărcare
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, sex, height, bodyweight, goal, experienceLevel, activityLevel, equipment }),
      });
      if (!response.ok) throw new Error("A apărut o eroare la generare.");
      const plan = await response.json();
      localStorage.setItem('fitnessPlan', JSON.stringify(plan));
      router.push('/plan');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Am schimbat grid-ul cu un flex-col pentru a aranja cardurile vertical
    <form onSubmit={handleSubmit} className="w-full space-y-12">
      
      {/* CARD 1: Detalii Personale */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">1. Your Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label htmlFor="age">Age</Label><Input id="age" type="number" placeholder="e.g., 25" value={age} onChange={(e) => setAge(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="sex">Sex</Label><Select onValueChange={setSex} required value={sex}><SelectTrigger><SelectValue placeholder="Select your sex" /></SelectTrigger><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="height">Height (cm)</Label><Input id="height" type="number" placeholder="e.g., 180" value={height} onChange={(e) => setHeight(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="bodyweight">Bodyweight (kg)</Label><Input id="bodyweight" type="number" placeholder="e.g., 75" value={bodyweight} onChange={(e) => setBodyweight(e.target.value)} required /></div>
        </div>
      </div>

      {/* CARD 2: Profil de Fitness */}
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
      
      {/* CARD 3: Echipament */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">3. Your Available Equipment</h2>
        <p className="text-sm text-muted-foreground mb-6">Select all that apply. If you have full gym access, you don't need to select anything else.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Am adăugat și "Full Gym" ca opțiune */}
          {["Full Gym", ...equipmentOptions].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={item} checked={equipment.includes(item)} onCheckedChange={() => handleEquipmentChange(item)} />
              <Label htmlFor={item} className="font-normal cursor-pointer">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Butonul de Final */}
      <div className="text-center mt-8">
        <Button type="submit" size="lg" className="w-full md:w-1/2" disabled={isLoading}>
          {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Your Plan...</>) : ('Generate Your Personal Plan')}
        </Button>
      </div>

      {error && (<div className="text-center text-red-500 mt-4"><p>Error: {error}</p></div>)}
    </form>
  );
}