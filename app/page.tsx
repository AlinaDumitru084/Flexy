// Correct code for app/page.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <div className="mb-8">
        <h1 className="text-7xl font-extrabold tracking-tighter text-gray-900">
          Flexy
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          Flex your limits.
        </p>
      </div>
      <p className="max-w-md mb-8 text-lg text-gray-700">
        Welcome! I'm your personal AI fitness and nutrition coach. Let's work together to achieve your goals.
      </p>
      <Link href="/details">
        <Button size="lg" className="text-lg">
          Let's have a conversation
        </Button>
      </Link>
    </main>
  );
}