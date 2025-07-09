// app/about/page.tsx

import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Acest container va centra blocurile principale (titlul și div-ul cu text) */}
      <div className="container mx-auto px-6 py-16 flex flex-col items-center">
        
        {/* Titlul rămâne centrat */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-12 text-center">🏋️‍♀️ About Flexy</h1>

        {/* --- CONTAINER DE TEXT MODIFICAT --- */}
        {/* Am șters clasa 'text-center' de aici. Textul va reveni la alinierea implicită (stânga). */}
        <div className="space-y-12 text-lg text-muted-foreground max-w-5xl">
          
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">What is Flexy?</h2>
            <p className="leading-relaxed mb-4">
              Flexy is more than just a fitness app — it’s your personal digital coach, your daily motivator, and your biggest supporter. We know that starting or staying consistent with a fitness journey can feel overwhelming, confusing, or even intimidating. That’s why Flexy is here: to guide you step by step, to make healthy habits simple, and to celebrate every win with you along the way.
            </p>
            <p className="leading-relaxed">
              Flexy gives you clear, realistic workout and nutrition plans that fit your life — not the other way around. It doesn’t matter if you’re a beginner, coming back after a break, or pushing for a new personal best. With Flexy, your plan grows as you do.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="leading-relaxed mb-4">
              Our mission is to inspire you to flex your limits, to prove to yourself that you can do more than you ever thought possible. We believe fitness shouldn’t be about perfection — it should be about progress, self-discovery, and feeling strong in your own skin.
            </p>
            <p className="leading-relaxed">
              We turn complex fitness ideas into small, doable steps you can actually stick to. And we do it with compassion, encouragement, and zero judgment. Because you don’t need to be perfect — you just need to keep going.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Flexy is Different</h2>
            <p className="leading-relaxed">
              Flexy isn’t just a plan. It’s your daily dose of motivation when you feel like giving up. It’s a reminder that every rep, every healthy choice, every small action counts. It’s the confidence boost when you step into the gym and actually know what to do.
            </p>
            <p className="leading-relaxed mt-4">
              We’re here to remind you: you’ve got this. And you don’t have to do it alone.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Journey, Your Way</h2>
            <p className="leading-relaxed">
              Take it one workout at a time. One meal at a time. One day at a time. Flexy is here to adapt to you, to fit your lifestyle, and to grow with you — so you can build healthy habits that last, and a stronger, happier you.
            </p>
          </section>

        </div>

        {/* Acest buton este centrat datorită containerului principal */}
        <div className="mt-16">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}