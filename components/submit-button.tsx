'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function SubmitButton({ name, className }: { name: string; className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} className={className}>
      {pending ? 'Submitting...' : name}
    </Button>
  );
}
