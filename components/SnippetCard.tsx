import Link from 'next/link';
import { Suspense } from 'react';
import ViewCounter from '@/app/blog/views';
import { getViewsCount } from '@/lib/get-views';

const SnippetCard = ({
  title,
  description,
  slug,
  publishedAt,
  readingTime,
  tags,
  views,
}: {
  title: string;
  description: string;
  slug: string;
  readingTime: string;
  publishedAt?: string;
  tags?: string;
  views?: number | boolean;
}) => {
  // here tags is string, so we need to convert it to array
  let newTags = tags?.split(',');

  return (
    <div className='rounded-md border border-neutral-400 bg-neutral-200 p-4 hover:border-neutral-800 hover:bg-neutral-300 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-100 dark:hover:bg-zinc-700'>
      <div className='flex flex-row justify-between'>
        <h2 className='mb-2 w-full text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100'>
          <Link href={`/snippet/${slug}`} className='hover:underline cursor-pointer'>
            {title}
          </Link>
        </h2>
        {views && (
          <div className='mb-4 hidden w-32 text-right sm:block md:mb-0'>
            <Suspense fallback={<p>--- Views</p>}>
              <Views slug={slug} />
            </Suspense>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex flex-col justify-between gap-2'>
            <p className='text-base font-medium text-gray-700 dark:text-gray-300'>
              {publishedAt} | {readingTime}
            </p>
            {views && (
              <div className='mb-4 w-32 text-base sm:hidden md:mb-0'>
                <Suspense fallback={<p>--- Views</p>}>
                  <Views slug={slug} />
                </Suspense>
              </div>
            )}
          </div>
          <p className='text-base font-semibold text-gray-700 dark:text-gray-300'>{description}</p>
        </div>
        <span className='flex flex-row flex-wrap justify-center gap-2 sm:justify-end'>
          {newTags?.map((tag) => (
            <span
              key={tag}
              className='mr-2 px-3 py-1 text-sm font-semibold rounded-lg border border-neutral-600 text-neutral-900 dark:border-neutral-300 dark:text-white hover:underline'
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

export default SnippetCard;