import Link from "next/link"
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';


export default function LandingPage() {
  return (
    
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <HeroSection />
    
    </main>
  );
}