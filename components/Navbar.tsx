
import Link from 'next/link';

import { ThemeToggleButton } from './ThemeToggleButton'; 

export function Navbar() {
  return (
    
    <nav className="container mx-auto flex justify-end items-center py-4">
      
      {}

      {}
      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/" className="hover:text-red-400">Home</Link>
         <Link href="/about" className="hover:text-red-400">About</Link>
         <Link href="/contact" className="hover:text-red-400">Contact</Link>
        <ThemeToggleButton />
      </div>
    </nav>
  );
}