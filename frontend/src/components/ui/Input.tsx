import { concat } from '@/utils/text';
import React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={concat(
        'border-border bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-gray-500',
        'focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
