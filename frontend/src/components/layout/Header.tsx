'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { ThemeToggleButton } from '../ui/ThemeToggleButton';
import { LocationSearchTrigger } from '@/features/properties/components/LocationSearchTrigger';
import { LocationSearchModal } from '@/features/properties/components/LocationSearchModal';

export function Header() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <>
      <header className="bg-background/80 border-border sticky top-0 z-40 border-b backdrop-blur-sm">
        <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className="text-primary flex-shrink-0 font-serif text-2xl font-bold"
          >
            MILLION
          </Link>

          <div className="flex flex-1 justify-center px-4">
            <LocationSearchTrigger
              onClick={() => setIsLocationModalOpen(true)}
            />
          </div>

          <div className="flex flex-shrink-0 items-center space-x-2">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
            <ThemeToggleButton />
          </div>
        </nav>
      </header>
      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
