import { Button } from '@/components/ui/button';
import { allTags } from '@/lib/get-tags';
import { Link } from 'next-view-transitions';

export default async function TagsPage() {
  const tags = Object.keys(allTags);

  tags.sort((a, b) => allTags[b] - allTags[a]);

  return (
    <>
      <section className='mx-auto mt-16 flex min-h-screen w-11/12 flex-col items-center gap-4 sm:mt-40'>
        <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
          All Tags
        </h1>
        <div className='mb-5 flex flex-row flex-wrap gap-4'>
          {tags.map((tag) => (
            <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
              <Button
                variant='outline'
                className='cursor-pointer border-2 border-indigo-500 text-lg font-semibold hover:underline'
              >
                {tag} ({allTags[tag]})
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
