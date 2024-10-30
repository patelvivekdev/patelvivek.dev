import { Skeleton } from '@/components/ui/skeleton';

export function BlogSkeleton() {
  return (
    <div className='rounded-md border border-gray-200 bg-gray-100 p-4 hover:border-gray-300 hover:bg-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700'>
      <div className='flex flex-row justify-between'>
        <h2 className='mb-2 w-full text-lg font-bold text-neutral-900 dark:text-neutral-100 sm:text-xl'>
          <Skeleton className='h-4 w-[200px]' />
        </h2>
        <div className='mb-4 hidden w-32 text-right sm:block md:mb-0'>
          <Skeleton className='h-4 w-[50px]' />
        </div>
      </div>
      <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex flex-col justify-between gap-2'>
            <div className='flex flex-row items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300'>
              <Skeleton className='h-2 w-[20px]' /> |{' '}
              <Skeleton className='h-2 w-[20px]' />
            </div>
            <div className='mb-4 w-32 text-base sm:hidden md:mb-0'>
              <Skeleton className='h-4 w-[50px]' />
            </div>
          </div>
          <div className='flex flex-col gap-1 text-base font-semibold text-gray-700 dark:text-gray-300'>
            <Skeleton className='h-4 w-full sm:w-[500px]' />
            <Skeleton className='h-4 w-11/12 sm:w-[400px]' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecentBlogsSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  );
}
