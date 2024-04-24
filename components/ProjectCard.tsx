import Link from 'next/link';

export default function ProjectCard({
  title,
  description,
  link,
  tags,
}: {
  title: string;
  description: string;
  link: string;
  tags: string[];
}) {
  // short the tags in alphabetical order
  tags.sort();

  return (
    <div className='rounded-md border border-neutral-400 bg-neutral-200 p-4 hover:border-neutral-800 hover:bg-neutral-300 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:border-zinc-100 dark:hover:bg-zinc-700'>
      <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
        <div className='flex flex-col justify-between'>
          <h2 className='mb-2 w-full text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
            <Link prefetch={true} href={link} className='hover:underline'>
              {title}
            </Link>
          </h2>
          <p className='text-lg sm:text-xl text-gray-700 dark:text-gray-300'>{description}</p>
        </div>
        <span className='flex flex-row flex-wrap justify-center gap-2 sm:justify-end'>
          {tags.map((tag) => (
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
}
