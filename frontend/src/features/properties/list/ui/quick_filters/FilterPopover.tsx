'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/shared/ui';
import { FilterPopoverProps } from '../../types/filters';

export function FilterPopover<T>({
  trigger,
  children,
  onApply,
  onClear,
  initialValue,
  validateApply,
}: FilterPopoverProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [temporaryValue, setTemporaryValue] = useState<T | undefined>(
    initialValue
  );
  const [applyError, setApplyError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTemporaryValue(initialValue);
      setApplyError(null);
    }
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
        setApplyError(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setTemporaryValue(initialValue);
        setApplyError(null);
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
    const value = temporaryValue as T;
    if (validateApply) {
      const error = validateApply(value);
      if (error) {
        setApplyError(error);
        return;
      }
    }
    onApply(value);
    setIsOpen(false);
    setApplyError(null);
  }, [onApply, temporaryValue, validateApply]);

  const handleClear = useCallback(() => {
    onClear?.();
    setTemporaryValue(initialValue);
    setIsOpen(false);
    setApplyError(null);
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
              applyError: applyError ?? undefined,
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
