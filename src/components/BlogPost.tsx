import { Link } from 'next-view-transitions';
import { Suspense } from 'react';
import ViewCounter from '@/components/views';
import { getViewsCount } from '@/lib/get-views';
import { Eye } from 'lucide-react';

const BlogPost = ({
  title,
  summary,
  slug,
  publishedAt,
  readingTime,
  external,
  tags,
  views,
}: {
  title: string;
  summary: string;
  slug: string;
  readingTime: string;
  tags: string[];
  publishedAt: string;
  external?: boolean;
  views?: number | boolean;
}) => {
  return (
    <>
      {external ? (
        <ExternalBlogPost
          title={title}
          summary={summary}
          slug={slug}
          publishedAt={publishedAt}
          tags={tags}
          views={views}
          readingTime={readingTime}
        />
      ) : (
        <InternalBlogPost
          title={title}
          summary={summary}
          slug={slug}
          publishedAt={publishedAt}
          tags={tags}
          readingTime={readingTime}
          views={views}
        />
      )}
    </>
  );
};

export default BlogPost;

async function InternalBlogPost({
  title,
  summary,
  slug,
  readingTime,
  publishedAt,
  tags,
  views,
}: {
  title: string;
  summary: string;
  slug: string;
  readingTime: string;
  publishedAt: string;
  tags: string[];
  views?: number | boolean;
}) {
  tags.sort();
  return (
    <div className='rounded-md border border-neutral-400 bg-neutral-200 p-4 hover:border-neutral-800 hover:bg-neutral-300 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-100 dark:hover:bg-zinc-700'>
      <div className='grid grid-cols-1 items-center justify-items-end gap-2 sm:grid-cols-3'>
        <h2 className='w-full text-2xl font-bold text-neutral-900 dark:text-neutral-100 sm:col-span-2'>
          <Link
            prefetch={true}
            href={`/blog/${slug}`}
            className='cursor-pointer hover:underline'
          >
            {title}
          </Link>
        </h2>
        {views && (
          <div className='hidden sm:flex'>
            <Suspense
              fallback={
                <p className='flex flex-row gap-2'>
                  <Eye />
                  <span> --- Views</span>
                </p>
              }
            >
              <Views slug={slug} />
            </Suspense>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex flex-col justify-between gap-2'>
            <p className='text-base font-medium text-neutral-800 dark:text-gray-300'>
              {publishedAt} | {readingTime}
            </p>
            {views && (
              <div className='sm:hidden'>
                <Suspense
                  fallback={
                    <p className='flex flex-row gap-2'>
                      <Eye />
                      <span> --- Views</span>
                    </p>
                  }
                >
                  <Views slug={slug} />
                </Suspense>
              </div>
            )}
          </div>
          <p className='text-xl font-semibold text-neutral-800 dark:text-gray-300'>
            {summary}
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
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

function ExternalBlogPost({
  title,
  summary,
  slug,
  readingTime,
  publishedAt,
  tags,
  views,
}: {
  title: string;
  summary: string;
  slug: string;
  readingTime: string;
  publishedAt?: string;
  tags: string[];
  views?: number | boolean;
}) {
  tags.sort();
  return (
    <div className='rounded-md border border-gray-300 bg-gray-200 p-4 hover:border-gray-300 hover:bg-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:bg-slate-700'>
      <div className='grid grid-cols-1 items-center justify-items-end gap-2 sm:grid-cols-3'>
        <h4 className='w-full text-2xl font-bold text-neutral-900 dark:text-neutral-100 sm:col-span-2'>
          <a
            href={slug}
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer hover:underline'
          >
            {title}
          </a>
        </h4>
        <div className='hidden w-32 text-right text-base text-neutral-800 dark:text-gray-200/75 sm:block md:mb-0'>
          {views && (
            <p className='flex flex-row items-center gap-2 text-base text-neutral-800 dark:text-gray-300'>
              <Eye /> {`${views} views`}
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex flex-col justify-between gap-2'>
            <p className='text-base font-medium text-neutral-800 dark:text-gray-200/75'>
              {publishedAt} | {readingTime}
            </p>
            <div className='w-32 text-base text-neutral-800 dark:text-gray-200/75 sm:hidden md:mb-0'>
              {views && (
                <p className='flex flex-row items-center gap-2 text-base text-neutral-800 dark:text-gray-300'>
                  <Eye /> {`${views} views`}
                </p>
              )}
            </div>
          </div>
          <p className='text-xl font-medium text-neutral-800 dark:text-gray-200/75'>
            {summary}
          </p>
        </div>
        <span className='mr-2 flex flex-row flex-wrap justify-center gap-2 sm:justify-end'>
          {tags?.map((tag) => (
            <span
              key={tag}
              className='mr-2 rounded-lg border-2 border-indigo-700 px-3 py-1 text-sm font-semibold text-neutral-900 dark:text-white'
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
