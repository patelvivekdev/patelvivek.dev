import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse dark:bg-white bg-gray-600 rounded-md', className)} {...props} />;
}

export { Skeleton };
