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
    <div className='w-full rounded-md border border-gray-200 bg-gray-100 p-4 hover:border-gray-300 hover:bg-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-700'>
      <div className='w-full'>
        <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
          <div className='flex flex-col justify-between'>
            <div>
              <h2 className='mb-2 w-full text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                <Link prefetch={true} href={link} className='hover:text-sky-700 dark:hover:text-sky-300'>
                  {title}
                </Link>
              </h2>
              <p className='text-lg sm:text-xl text-gray-700 dark:text-gray-300'>{description}</p>
            </div>
          </div>
          <span className='flex flex-row flex-wrap justify-center gap-2 sm:justify-end'>
            {tags.map((tag) => (
              <span key={tag} className='mr-2 inline-block rounded-lg bg-sky-700 px-3 py-1 text-sm font-semibold text-white'>
                {tag.toUpperCase()}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
