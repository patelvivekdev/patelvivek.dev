import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import getProjects, { getProject } from '@/lib/get-projects';
import { CustomMDX } from '@/components/mdx';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';

import { Calendar } from 'lucide-react';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  getProjects();
  const project = await getProject(params.id);

  if (!project) {
    return notFound();
  }

  let { title, publishedAt: publishedTime, description: description, image, tags } = project.metadata;

  tags = tags ? tags.split(',') : [];

  let ogImage = image ? `https://patelvivek.dev${image}` : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
    keywords: tags,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://patelvivek.dev/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Project({ params }: { params: any }) {
  const project = await getProject(params.id);

  if (!project) {
    return notFound();
  }
  return (
    <div className='mx-auto mt-40 w-4/5'>
      <section>
        <h1 className='title text-center sm:text-start text-2xl font-medium tracking-tighter'>{project.metadata.title}</h1>
        <div className='mb-4 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            <span className='flex flex-row items-center gap-2'>{project.metadata.description}</span>
          </p>
        </div>
        <div className='mb-8 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar /> {formatDate(project.metadata.publishedAt)}
            </span>
          </p>
        </div>
        <hr />
        <article className='prose prose-zinc mx-auto my-10 max-w-none dark:prose-invert md:prose-lg lg:prose-xl prose-a:text-black dark:prose-a:text-white prose-a:no-underline'>
          <CustomMDX>{project.content}</CustomMDX>
        </article>
      </section>
    </div>
  );
}
