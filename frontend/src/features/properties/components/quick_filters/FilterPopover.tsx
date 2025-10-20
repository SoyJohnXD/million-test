'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { FilterPopoverProps } from '../../types/filters';

export function FilterPopover<T>({
  trigger,
  children,
  onApply,
  onClear,
  initialValue,
}: FilterPopoverProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [temporaryValue, setTemporaryValue] = useState<T | undefined>(
    initialValue
  );

  useEffect(() => {
    if (!isOpen) setTemporaryValue(initialValue);
  }, [isOpen, initialValue]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setTemporaryValue(initialValue);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setTemporaryValue(initialValue);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, initialValue]);

  const handleApply = useCallback(() => {
    onApply(temporaryValue as T);
    setIsOpen(false);
  }, [onApply, temporaryValue]);

  const handleClear = useCallback(() => {
    onClear?.();
    setTemporaryValue(initialValue);
    setIsOpen(false);
  }, [onClear, initialValue]);

  const togglePopover = () => setIsOpen((prev) => !prev);

  return (
    <div ref={containerRef} className="relative inline-block">
      {React.cloneElement(trigger, {
        onClick: togglePopover,
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
      })}

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          className="border-border bg-background absolute left-0 z-50 mt-2 w-[calc(100vw-2rem)] max-w-[320px] rounded-md border shadow-md sm:w-80"
          style={{
            contain: 'content',
          }}
        >
          <div className="p-4">
            {children({
              setTemporaryValue,
              initialValue: temporaryValue,
            })}
          </div>

          <div className="border-border bg-accent/20 flex justify-between rounded-b-md border-t p-3">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
