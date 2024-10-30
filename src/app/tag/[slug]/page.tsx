import { Button } from '@/components/ui/button';
import { getBlogByTag } from '@/lib/get-blogs';
import { getProjectsByTag } from '@/lib/get-projects';
import { getSnippetsByTag } from '@/lib/get-snippets';
import { allTags } from '@/lib/get-tags';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const tags = Object.keys(allTags);
  return tags.map((tag) => ({ slug: tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const blogs = await getBlogByTag(slug);

  const projects = await getProjectsByTag(slug);

  const snippets = await getSnippetsByTag(slug);

  if (blogs.length === 0 && projects.length === 0 && snippets.length === 0) {
    return notFound();
  }

  return (
    <Suspense fallback='loading tags...'>
      <div>
        <section className='mx-auto mb-5 mt-16 min-h-screen w-11/12 gap-4 sm:mt-40'>
          <Link href='/tag'>
            <Button
              variant='outline'
              className='mb-5 cursor-pointer border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-700 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-700'
            >
              &larr; Back to Tags
            </Button>
          </Link>
          <h1 className='mb-5 border-b-4 pb-4 text-center text-3xl font-bold text-indigo-500'>
            <Suspense fallback={<p>--</p>}>{slug.toUpperCase()}</Suspense>
          </h1>
          <div className='flex flex-col gap-4'>
            <Suspense fallback='loading...'>
              {blogs.length > 0 && (
                <>
                  <h2 className='text-2xl font-bold'>Blogs {blogs.length}</h2>
                  {blogs.map((blog) => (
                    <div
                      key={blog.slug}
                      className='flex flex-col gap-2 rounded-md border p-4'
                    >
                      <Link href={`/blog/${blog.slug}`}>
                        <h3 className='text-xl font-bold'>
                          {blog.metadata.title}
                        </h3>
                      </Link>
                      <p>{blog.metadata.summary}</p>
                    </div>
                  ))}
                </>
              )}
            </Suspense>
            <Suspense fallback='loading...'>
              {projects.length > 0 && (
                <>
                  <h2 className='text-2xl font-bold'>
                    Projects {projects.length}
                  </h2>
                  {projects.map((project) => (
                    <div
                      key={project.slug}
                      className='flex flex-col gap-2 rounded-md border p-4'
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className='text-xl font-bold'>
                          {project.metadata.title}
                        </h3>
                      </Link>
                      <p>{project.metadata.description}</p>
                    </div>
                  ))}
                </>
              )}
            </Suspense>
            <Suspense fallback='loading...'>
              {snippets.length > 0 && (
                <>
                  <h2 className='text-2xl font-bold'>
                    Snippets {snippets.length}
                  </h2>
                  {snippets.map((snippet) => (
                    <div
                      key={snippet.slug}
                      className='flex flex-col gap-2 rounded-md border p-4'
                    >
                      <Link href={`/snippet/${snippet.slug}`}>
                        <h3 className='text-xl font-bold'>
                          {snippet.metadata.title}
                        </h3>
                      </Link>
                      <p>{snippet.metadata.description}</p>
                    </div>
                  ))}
                </>
              )}
            </Suspense>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
