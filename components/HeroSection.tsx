// components/HeroSection.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="container mx-auto text-center py-20">
      
      <h1 className="text-7xl font-extrabold tracking-tighter">
        Flexy
      </h1>
      
      {/* --- THIS LINE IS MODIFIED --- */}
      <p className="text-xl text-muted-foreground mt-2">
        Flex your limits.
      </p>

      {/* --- THIS LINE IS MODIFIED --- */}
      <p className="text-lg text-muted-foreground mt-8 max-w-2xl mx-auto">
        Feeling lost at the gym? Flexy is your friendly guide to fitness. 
        We create simple, effective workout plans that grow with you. 
        Get step-by-step guidance and build your confidence, one workout at a time.
      </p>

      <Link href="/details">
        <Button size="lg" className="mt-8 bg-blue-400 hover:bg-blue-500 text-white font-bold text-lg">
          Let's have a conversation
        </Button>
      </Link>
    </section>
  );
}