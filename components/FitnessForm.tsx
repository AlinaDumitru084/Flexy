"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FitnessForm() {
  const router = useRouter(); // Initialize the router for navigation

  // State to hold form data - updated to have placeholders
  const [formData, setFormData] = useState({
    bodyweight: "",
    height: "",
    sex: "",
    age: "",
    goal: "Lose weight",
  });
  
  // State for loading status and errors during form submission
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes and update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  // --- NEW HANDLE SUBMIT FUNCTION ---
  // This function now generates the plan, saves it, and navigates to the chat page.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!formData.bodyweight || !formData.height || !formData.sex || !formData.age) {
        setError("Please fill out all the fields.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch("/api/generate", { // Still calling the original plan generator
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const initialPlan = await response.json();

      // Save the user's details and the newly generated plan to the browser's memory
      localStorage.setItem("userDetails", JSON.stringify(formData));
      localStorage.setItem("initialPlan", JSON.stringify(initialPlan));

      // Navigate to the new chat page to start the conversation
      router.push("/chat");

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false); // Stop loading if there's an error
    }
  };

  // --- MODIFIED RETURN JSX ---
  // The results and plan display have been removed. It's just the form now.
  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bodyweight">Bodyweight (e.g., 80kg)</Label>
              <Input id="bodyweight" value={formData.bodyweight} onChange={handleChange} placeholder="Your weight"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (e.g., 180cm)</Label>
              <Input id="height" value={formData.height} onChange={handleChange} placeholder="Your height"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select onValueChange={(value) => handleSelectChange('sex', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={formData.age} onChange={handleChange} placeholder="Your age"/>
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="goal">Primary Goal</Label>
              <Select onValueChange={(value) => handleSelectChange('goal', value)} defaultValue={formData.goal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lose weight">Lose weight</SelectItem>
                  <SelectItem value="Build muscle">Build muscle</SelectItem>
                  <SelectItem value="Improve endurance">Improve endurance</SelectItem>
                  <SelectItem value="General fitness">General fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 md:col-span-2 text-center">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? "Generating Plan..." : "Get My Plan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* This section displays any error messages that occur during submission */}
      {error && <p className="text-destructive text-center">{error}</p>}
    </>
  );
}