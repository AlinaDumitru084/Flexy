// components/HeroSection.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    // SCHIMBAT: Am înlocuit flexbox-ul centrat cu un grid cu 2 coloane
    <section className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      
      {/* COLOANA 1: Textul (aliniat la stânga) */}
      <div className="flex flex-col space-y-5">
        <h1 className="text-8xl font-extrabold tracking-tighter">
          Flexy
        </h1>
        
        <p className="text-xl text-muted-foreground mt-2">
          Flex your limits.
        </p>

        <p className="text-lg text-muted-foreground mt-8">
          Feeling lost at the gym? Flexy is your friendly guide to fitness. 
          We create simple, effective workout plans that grow with you. 
          Get step-by-step guidance and build your confidence, one workout at a time.
        </p>

        <div className="pt-4">
          <Link href="/details">
            <Button size="lg" className="text-lg font-bold text-white bg-gradient-to-r bg-red-400 hover:bg-red-500 hover:scale-105 transition-transform">
              Let's have a conversation
            </Button>
          </Link>
        </div>
      </div>

      {/* COLOANA 2: Imaginea (centrată în coloana ei) */}
      <div className="flex items-center justify-center">
        <Image
          src="/bodymodel.png"
          alt="Anatomical model of a muscular person posing"
          width={500}
          height={500}
          priority
          className="object-contain"
        />
      </div>

    </section>
  );
}