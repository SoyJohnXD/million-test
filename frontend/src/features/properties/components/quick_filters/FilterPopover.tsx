'use client';

import React, {
  useState,
  useRef,
  useEffect,
  ReactElement,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';

interface FilterPopoverProps<T = unknown> {
  trigger: ReactElement<{
    onClick?: () => void;
    'aria-expanded'?: boolean;
    'aria-haspopup'?: string;
  }>;
  children: ReactElement<{
    setTemporaryValue: (value: T) => void;
    initialValue?: T;
  }>;
  onApply: (value: T) => void;
  onClear?: () => void;
  initialValue?: T;
}

export function FilterPopover<T>({
  trigger,
  children,
  onApply,
  onClear,
  initialValue,
}: FilterPopoverProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [temporaryValue, setTemporaryValue] = useState<T | undefined>(
    initialValue
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) setTemporaryValue(initialValue);
  }, [isOpen, initialValue]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
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

  useEffect(() => {
    if (isOpen && triggerRef.current && popoverRef.current) {
      const calculatePosition = () => {
        const triggerRect = triggerRef.current!.getBoundingClientRect();
        const popoverRect = popoverRef.current!.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let top = triggerRect.bottom + window.scrollY + 8;
        let left = triggerRect.left + window.scrollX;

        if (left + popoverRect.width > windowWidth) {
          left = windowWidth - popoverRect.width - 16;
        }

        if (top + popoverRect.height > windowHeight) {
          top = triggerRect.top + window.scrollY - popoverRect.height - 8;
        }

        if (left < 16) {
          left = 16;
        }

        setPosition({ top, left });
        // Solo mostrar el popover después de calcular la posición
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      };

      calculatePosition();

      // Recalcular en caso de resize
      window.addEventListener('resize', calculatePosition);
      return () => window.removeEventListener('resize', calculatePosition);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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
    <>
      <div ref={triggerRef}>
        {React.cloneElement(trigger, {
          onClick: togglePopover,
          'aria-expanded': isOpen,
          'aria-haspopup': 'dialog',
        })}
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className="border-border bg-background fixed z-50 w-[calc(100%-32px)] max-w-[320px] rounded-md border shadow-md transition-opacity duration-150 sm:absolute sm:w-80"
            style={{
              top: position.top,
              left: position.left,
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div className="p-4">
              {React.cloneElement(children, {
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
          </div>,
          document.body
        )}
    </>
  );
}
