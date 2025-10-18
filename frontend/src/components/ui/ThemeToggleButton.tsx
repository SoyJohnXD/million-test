'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { Button } from './Button';
import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 px-3" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      className="h-9 w-9 rounded-full"
    >
      {theme === 'light' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
