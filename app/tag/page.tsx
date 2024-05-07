import { Button } from '@/components/ui/button';
import { allTags } from '@/lib/get-tags';
import Link from 'next/link';

export default function TagsPage() {
  const tags = Object.keys(allTags);

  tags.sort((a, b) => allTags[b] - allTags[a]);

  return (
    <section className='min-h-screen mt-16 sm:mt-40 w-11/12 sm:w-3/4 mx-auto flex flex-col items-center gap-4'>
      <h1 className='text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>All Tags</h1>
      <div className='flex flex-row flex-wrap gap-4 mb-5'>
        {tags.map((tag) => (
          <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
            <Button variant='outline' className='cursor-pointer text-lg font-semibold border-2 border-indigo-500 hover:underline'>
              {tag} ({allTags[tag]})
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
