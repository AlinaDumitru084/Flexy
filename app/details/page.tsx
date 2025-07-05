// Correct code for app/details/page.tsx

import FitnessForm from "@/components/FitnessForm";

export default function DetailsPage() {
  return (
    <main className="container mx-auto max-w-4xl p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">First, Some Details</h1>
        <p className="text-muted-foreground mt-2">
          Please provide the following information so I can create your personalized plan.
        </p>
      </div>
      
      {/* This is our reusable form component! */}
      <FitnessForm />

    </main>
  );
}