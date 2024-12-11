import { Link } from 'next-view-transitions';

export default function ProjectCard({
  title,
  description,
  slug,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  tags: string[];
}) {
  // short the tags in alphabetical order
  tags.sort();

  return (
    <div className='rounded-md border border-neutral-400 bg-neutral-200 p-4 hover:border-neutral-800 hover:bg-neutral-300 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-100 dark:hover:bg-zinc-700'>
      <div className='grid grid-cols-1 items-center gap-2'>
        <h2 className='mb-2 w-full text-xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-2xl'>
          <Link
            prefetch={true}
            href={`projects/${slug}`}
            className='hover:underline'
          >
            {title}
          </Link>
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300 sm:text-xl'>
          {description}
        </p>
        <span className='flex flex-row flex-wrap justify-center gap-2'>
          {tags.map((tag) => (
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
