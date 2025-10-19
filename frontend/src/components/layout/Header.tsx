'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/ui/Button';
import { ThemeToggleButton } from '../ui/ThemeToggleButton';
import { LocationSearchTrigger } from '@/features/properties/components/location_filter/LocationSearchTrigger';
import { LocationSearchModal } from '@/features/properties/components/location_filter/LocationSearchModal';

export function Header() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-background/80 border-border sticky top-0 z-[60] border-b backdrop-blur-sm">
        <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className="text-on-Primary flex-shrink-0 font-serif text-2xl font-bold"
          >
            <span className="block sm:hidden">M</span>
            <span className="hidden sm:block">MILLION</span>
          </Link>

          <div className="flex flex-1 justify-center px-4">
            <LocationSearchTrigger
              onClick={() => setIsLocationModalOpen(true)}
            />
          </div>

          <div className="hidden flex-shrink-0 items-center space-x-2 sm:flex">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
            <ThemeToggleButton />
          </div>

          <button onClick={() => setIsSidebarOpen(true)} className="sm:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Sidebar para móvil */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-[70] bg-black/30 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div
          className={`bg-background fixed top-0 right-0 h-full w-64 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4">
            <button onClick={() => setIsSidebarOpen(false)} className="mb-4">
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                Log In
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-start"
              >
                Sign Up
              </Button>
              <div className="flex items-center pt-2">
                <ThemeToggleButton /> <span>Theme</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
