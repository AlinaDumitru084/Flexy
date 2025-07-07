// components/Navbar.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from './ThemeToggleButton'; 

export function Navbar() {
  return (
    // --- THIS IS THE MODIFIED PART ---
    // We changed justify-between to justify-end
    <nav className="container mx-auto flex justify-end items-center py-4">
      {/* The "Flexy" div that was here has been deleted */}

      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <Link href="#" className="hover:text-red-500">About</Link>
        <Link href="#" className="hover:text-red-500">Contact</Link>
        <ThemeToggleButton />
      </div>
    </nav>
    // --- END OF MODIFIED PART ---
  );
}