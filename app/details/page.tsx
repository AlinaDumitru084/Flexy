// This is the final, corrected code for /app/details/page.tsx

import FitnessForm from "@/components/FitnessForm";

export default function DetailsPage() {
  return (
    // This <main> element's ONLY job is to center its direct child in the middle of the screen.
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      
      {/* This new <div>'s job is to set the width for all the content inside it. */}
      {/* This prevents the form from shrinking. */}
      <div className="w-full max-w-4xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">First, Some Details</h1>
          <p className="text-muted-foreground mt-2">
            Please provide the following information so I can create your personalized plan.
          </p>
        </div>
        
        <FitnessForm />
      
      </div>

    </main>
  );
}