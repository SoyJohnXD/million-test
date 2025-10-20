'use client';

type ToastVariant = 'info' | 'error' | 'warning' | 'success';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  className?: string;
}

const variantStyles: Record<ToastVariant, string> = {
  info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900',
  error:
    'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900',
  warning:
    'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-200 dark:border-yellow-900',
  success:
    'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/40 dark:text-green-200 dark:border-green-900',
};

export function Toast({
  title,
  description,
  variant = 'info',
  className,
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`border ${variantStyles[variant]} rounded-md p-3 ${className ?? ''}`}
    >
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm opacity-90">{description}</div>}
    </div>
  );
}
