'use client';

import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { Button } from '@/components/ui/Button';

interface FilterPopoverProps {
  trigger: ReactElement;
  children: React.ReactNode;
  title: string;
  onApply?: () => void;
  onClear?: () => void;
}

export function FilterPopover({
  trigger,
  children,
  title,
  onApply,
  onClear,
}: FilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleApply = () => {
    onApply?.();
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear?.();
    setIsOpen(false);
  };

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={popoverRef}>
      {React.cloneElement(trigger, {
        onClick: togglePopover,
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
      })}

      {isOpen && (
        <div className="border-border bg-surface text-secondary absolute top-full left-0 z-20 mt-2 w-72 rounded-md border shadow-lg">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-semibold">{title}</h4>
            {children}
          </div>
          {(onApply || onClear) && (
            <div className="border-border bg-accent/30 flex justify-between rounded-b-md border-t p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={!onClear}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApply}
                disabled={!onApply}
              >
                Apply
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
