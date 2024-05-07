import { Button } from '@/components/ui/button';
import { getAllProjectsTags } from '@/lib/get-projects';
import Link from 'next/link';

export default function TagsPage() {
  const projectTags = getAllProjectsTags();
  // console.log(projectTags.)
  // get all keys

  const tags = Object.keys(projectTags);

  tags.sort((a, b) => projectTags[b].count - projectTags[a].count);

  return (
    <section className='h-screen mt-16 sm:mt-40 w-11/12 sm:w-3/4 mx-auto'>
      <div className='flex flex-row flex-wrap gap-4 mb-5'>
        {tags.map((tag) => (
          <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
            <Button variant='outline' className='cursor-pointer text-lg font-semibold border-2 border-indigo-500 hover:underline'>
              {tag} ({projectTags[tag].count})
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
