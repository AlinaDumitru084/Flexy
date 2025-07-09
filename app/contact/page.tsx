// app/contact/page.tsx

'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Have a question or feedback? We'd love to hear from you! Reach out directly or fill out the form below.
        </p>

        <div className="mb-16 flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex items-center gap-4">
            <Mail className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-xl font-semibold">Email Us</h3>
              <a href="mailto:contact@flexyapp.com" className="text-muted-foreground hover:text-red-500">
                contact@flexyapp.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-xl font-semibold">Call Us</h3>
              <p className="text-muted-foreground">+40 722 123 456</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Or Send Us a Message</h2>

        {/* Aici faci layout orizontal cu flex */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* FORMULAR STÂNGA */}
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-8">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
              />
            </div>
            <Button type="submit" size="lg">Send Message</Button>
          </form>

          {/* IMAGINE DREAPTA */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end items-start">
            <Image
              src="/mockup-phone-contact.png"
              alt="Mockup phone displaying contact form"
              width={300}
              height={300}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
