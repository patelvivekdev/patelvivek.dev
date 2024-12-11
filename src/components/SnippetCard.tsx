import { Link } from 'next-view-transitions';
import { Suspense } from 'react';
import ViewCounter from '@/components/views';
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
  tags: string[];
  views?: number | boolean;
}) => {
  return (
    <div className='rounded-md border border-neutral-400 bg-neutral-200 p-4 hover:border-neutral-800 hover:bg-neutral-300 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-100 dark:hover:bg-zinc-700'>
      <div className='grid grid-cols-1 items-center justify-items-end gap-2 sm:grid-cols-3'>
        <h2 className='w-full text-2xl font-bold text-neutral-900 dark:text-neutral-100 sm:col-span-2'>
          <Link
            href={`/snippet/${slug}`}
            className='cursor-pointer hover:underline'
          >
            {title}
          </Link>
        </h2>
        {views && (
          <div className='hidden sm:flex'>
            <Suspense fallback={<p>--- Views</p>}>
              <Views slug={slug} />
            </Suspense>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
        <div className='flex flex-col justify-between gap-2'>
          <p className='text-base font-medium text-neutral-800 dark:text-gray-300'>
            {publishedAt} | {readingTime}
          </p>
          {views && (
            <div className='sm:hidden'>
              <Suspense fallback={<p>--- Views</p>}>
                <Views slug={slug} />
              </Suspense>
            </div>
          )}
          <p className='text-xl font-semibold text-neutral-800 dark:text-gray-300'>
            {description}
          </p>
        </div>
        <span className='flex flex-row flex-wrap justify-center gap-2 sm:justify-end'>
          {tags?.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase()}`}
              className='mr-2 rounded-lg border-2 border-indigo-700 px-3 py-1 text-sm font-semibold text-neutral-900 hover:underline dark:text-white'
            >
              {tag.toUpperCase()}
            </Link>
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
