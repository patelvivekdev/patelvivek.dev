import React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-600 dark:bg-white',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
