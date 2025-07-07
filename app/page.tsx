// PASTE THIS NEW CODE IN /app/page.tsx

// We need to import our new components, NOT the old ones
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';

export default function LandingPage() {
  return (
    // We give the whole page a black background and white text
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <HeroSection />
    
    </main>
  );
}