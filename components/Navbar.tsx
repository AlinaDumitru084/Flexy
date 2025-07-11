// components/Navbar.tsx

import Link from 'next/link';
// Asigură-te că acest component există, dacă nu, șterge linia de mai jos și componenta <ThemeToggleButton />
import { ThemeToggleButton } from './ThemeToggleButton'; 

export function Navbar() {
  return (
    // SCHIMBAT: justify-between -> justify-end
    // Deoarece avem un singur element (div-ul cu linkuri), vrem să-l împingem la dreapta.
    <nav className="container mx-auto flex justify-end items-center py-4">
      
      {/* ȘTERS: Am eliminat complet link-ul "Flexy" de aici */}

      {/* Acest div va fi acum singurul element și va fi aliniat la dreapta */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/" className="hover:text-red-400">Home</Link>
         <Link href="/about" className="hover:text-red-400">About</Link>
         <Link href="/contact" className="hover:text-red-400">Contact</Link>
        <ThemeToggleButton />
      </div>
    </nav>
  );
}