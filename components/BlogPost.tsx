import Link from 'next/link';
import { Suspense } from 'react';
import { getViewsCount } from '@/app/data';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPost = ({
  title,
  summary,
  slug,
  publishedAt,
  external,
  tags,
  views,
}: {
  title: string;
  summary: string;
  slug: string;
  external?: boolean;
  publishedAt?: string;
  tags?: string;
  views?: number;
}) => {
  return (
    <>
      {external ? (
        <ExternalBlogPost title={title} summary={summary} slug={slug} publishedAt={publishedAt} tags={tags} views={views} />
      ) : (
        <InternalBlogPost title={title} summary={summary} slug={slug} publishedAt={publishedAt} tags={tags} />
      )}
    </>
  );
};

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount(slug);
  return <p>{`${views ? views : '--'} views`}</p>;
}

export default BlogPost;

function InternalBlogPost({
  title,
  summary,
  slug,
  publishedAt,
  tags,
}: {
  title: string;
  summary: string;
  slug: string;
  publishedAt?: string;
  tags?: string;
}) {
  // here tags is string, so we need to convert it to array
  let newTags = tags?.split(',');

  return (
    <Link
      prefetch={true}
      href={`/blog/${slug}`}
      className='rounded-md border border-gray-200 bg-gray-100 p-4 hover:border-gray-300 hover:bg-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700'
    >
      <div className='flex flex-row justify-between'>
        <h4 className='mb-2 w-full font-medium text-neutral-900 dark:text-neutral-100'>{title}</h4>
        <div className='mb-4 hidden w-32 text-right text-gray-500 sm:block md:mb-0'>
          <Suspense fallback={<Skeleton className='h-4 rounded-full bg-slate-300 dark:bg-slate-100' />}>
            <Views slug={slug} />
          </Suspense>
        </div>
      </div>
      <div className='grid grid-cols-1 items-center gap-2  sm:grid-cols-2'>
        <div>
          <div className='flex flex-row justify-between'>
            <p className='text-sm text-gray-400 dark:text-gray-500'>{publishedAt}</p>
            <div className='mb-4 w-32 text-right text-gray-500 sm:hidden md:mb-0'>
              <Suspense fallback={<Skeleton className='h-4 rounded-full bg-slate-300 dark:bg-slate-100' />}>
                <Views slug={slug} />
              </Suspense>
            </div>
          </div>
          <p className='text-gray-600 dark:text-gray-400'>{summary}</p>
        </div>
        <span className='mr-2 flex flex-row flex-wrap justify-center gap-2 text-sm font-semibold text-gray-900 dark:text-white sm:justify-end'>
          {newTags?.map((tag) => (
            <span
              key={tag}
              className='mr-2 inline-block rounded-lg bg-sky-700 px-3 py-1 text-sm font-semibold text-black dark:bg-sky-700 dark:text-white'
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </span>
      </div>
    </Link>
  );
}

function ExternalBlogPost({
  title,
  summary,
  slug,
  publishedAt,
  tags,
  views,
}: {
  title: string;
  summary: string;
  slug: string;
  publishedAt?: string;
  tags?: string;
  views?: number;
}) {
  return (
    <div className='rounded-md border border-gray-300 bg-gray-200 p-4 hover:border-gray-300 hover:bg-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700'>
      <a href={slug} target='_blank' rel='noopener noreferrer'>
        <div className='flex flex-row justify-between'>
          <h4 className='mb-2 w-full font-medium text-neutral-900 dark:text-neutral-100'>{title}</h4>
          <div className='mb-4 hidden w-32 text-right text-gray-500 sm:block md:mb-0'>
            <p>{`${views ? views : '--'} views`}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 items-center gap-2  sm:grid-cols-2'>
          <div>
            <div className='flex flex-row justify-between'>
              <p className='text-sm text-gray-400 dark:text-gray-500'>{publishedAt}</p>
              <div className='mb-4 w-32 text-right text-gray-500 sm:hidden md:mb-0'>
                <p>{`${views ? views : '--'} views`}</p>
              </div>
            </div>
            <p className='text-gray-600 dark:text-gray-400'>{summary}</p>
          </div>
          <span className='mr-2 flex flex-row flex-wrap justify-center gap-2 text-sm font-semibold text-gray-900 dark:text-white sm:justify-end'>
            {tags?.split(',').map((tag) => (
              <span
                key={tag}
                className='mr-2 inline-block rounded-lg bg-sky-700 px-3 py-1 text-sm font-semibold text-black dark:bg-sky-700 dark:text-white'
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </span>
        </div>
      </a>
    </div>
  );
}
