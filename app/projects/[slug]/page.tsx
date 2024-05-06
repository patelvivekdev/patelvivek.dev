import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getProject, getProjects } from '@/lib/get-projects';
import { CustomMDX } from '@/components/mdx/mdx';
import { formatDate } from '@/lib/utils';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  const project = getProject(params.slug);

  if (!project) {
    return notFound();
  }

  let { title, publishedAt: publishedTime, description: description, image, tags } = project.metadata;

  const newTags = tags ? tags.split(',') : [];

  let ogImage = image ? `https://patelvivek.dev${image}` : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
    keywords: newTags,
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

function getDateTime(date: string) {
  return new Date(date);
}

export default function Project({ params }: { params: any }) {
  const project = getProject(params.slug);

  if (!project) {
    return notFound();
  }
  return (
    <div className='mx-auto mt-16 sm:mt-40 w-11/12 sm:w-3/4'>
      <Progress />
      <section>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: project.metadata.title,
              datePublished: getDateTime(project.metadata.publishedAt!),
              dateModified: getDateTime(project.metadata.publishedAt!),
              description: project.metadata.description!,
              image: project.metadata.image
                ? `https://patelvivek.dev${project.metadata.image}`
                : `https://patelvivek.dev/og?title=${project.metadata.title}`,
              url: `https://patelvivek.dev/projects/${project.slug}`,
              author: {
                '@type': 'Person',
                name: 'Vivek Patel',
                url: 'https://patelvivek.dev/',
              },
            }),
          }}
        />
        <Link href='/projects'>
          <Button
            variant='outline'
            className='
            cursor-pointer text-lg font-semibold border-2 mb-5
            border-neutral-800 text-neutral-800 hover:underline
            dark:border-neutral-300 dark:text-neutral-300
            hover:border-indigo-500 hover:dark:border-indigo-500
          '
          >
            &larr; Back to Projects
          </Button>
        </Link>
        <h1 className='text-start text-2xl sm:text-4xl font-bold'>{project.metadata.title}</h1>
        <div className='mb-4 mt-2 flex items-center justify-between'>
          <p className='text-lg font-normal text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>{project.metadata.description}</span>
          </p>
        </div>
        <div className='mb-8 mt-2 flex items-center justify-between'>
          <p className='text-base text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar /> {formatDate(project.metadata.publishedAt!)} | {project.readingTime}
            </span>
          </p>
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
      </section>
    </div>
  );
}

function RoundedImage(props: any) {
  return (
    <Image
      alt={props.alt}
      className='rounded-lg shadow-lg dark:shadow-white shadow-slate-800 mx-auto'
      {...props}
      priority={true}
      width={props.width}
      height={props.height}
    />
  );
}
