/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
// import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { getProjects } from '@/lib/get-projects';
import { CustomMDX } from '@/components/mdx/mdx';
import { formatDate } from '@/lib/server-utils';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import SimilarPost, { SkeletonSimilarPost } from '@/components/SimilarPost';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const slug = (await params).slug;
  const project = (await getProjects()).find((post) => post.slug === slug);

  if (!project) {
    return notFound();
  }

  const {
    title,
    publishedAt: publishedTime,
    description: description,
    image,
    tags,
  } = project.metadata;

  const ogImage = image
    ? `https://patelvivek.dev${image}`
    : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    metadataBase: new URL('https://patelvivek.dev/projects'),
    description,
    keywords: tags ? tags : [],
    openGraph: {
      title,
      siteName: 'Vivek Patel | patelvivek.dev',
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

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = (await getProjects()).find((post) => post.slug === slug);

  if (!project) {
    return notFound();
  }

  const publishedDate = await formatDate(project.metadata.publishedAt!);
  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      <div className='mx-auto mt-16 w-11/12 flex-1 overflow-y-auto sm:mt-40'>
        <Progress />
        <Link href='/projects'>
          <Button
            variant='outline'
            className='mb-5 cursor-pointer border-2 border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-500 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-500'
          >
            &larr; Back to Projects
          </Button>
        </Link>
        <h1 className='text-start text-2xl font-bold text-indigo-500 sm:text-4xl'>
          {project.metadata.title}
        </h1>
        <div className='mb-4 mt-2 flex items-center justify-between'>
          <p className='text-lg font-normal text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>
              {project.metadata.description}
            </span>
          </p>
        </div>
        <div className='mb-8 mt-2 flex items-center justify-between'>
          <p className='text-base text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar />
              {publishedDate} | {project.readingTime}
            </span>
          </p>
        </div>
        <div className='mb-5 flex flex-row flex-wrap gap-4'>
          {project.metadata.tags?.map((tag) => (
            <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
              <Button
                variant='outline'
                className='cursor-pointer border-2 border-indigo-500 text-lg font-semibold hover:underline'
              >
                {tag}
              </Button>
            </Link>
          ))}
        </div>
        <article className='prose prose-zinc mx-auto my-10 max-w-none dark:prose-invert md:prose-lg lg:prose-xl'>
          <CustomMDX
            components={{
              RoundedImage: RoundedImage,
            }}
          >
            {project.content}
          </CustomMDX>
        </article>
      </div>
      <aside className='sticky top-16 mx-auto mb-4 h-fit w-11/12 overflow-y-auto sm:top-40 sm:mb-0 sm:h-screen md:w-1/4'>
        <Suspense fallback={<SkeletonSimilarPost />}>
          <SimilarPost slug={slug} content={project.content} type='project' />
        </Suspense>
      </aside>
    </div>
  );
}

function RoundedImage(props: any) {
  return (
    <Image
      alt={props.alt}
      className='mx-auto max-h-96 w-full rounded-lg object-cover object-left-top shadow-lg shadow-slate-800 dark:shadow-white'
      {...props}
      priority={true}
      width={props.width}
      height={props.height}
    />
  );
}
