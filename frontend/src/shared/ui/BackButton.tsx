'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={() => router.back()}
      variant="outline"
      data-view-transition="back-button"
    >
      ← Volver
    </Button>
  );
}
