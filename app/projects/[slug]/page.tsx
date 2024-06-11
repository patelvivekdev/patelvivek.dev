import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/get-projects';
import { CustomMDX } from '@/components/mdx/mdx';
import { formatDate } from '@/lib/utils';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// export function generateStaticParams() {
//   const projects = getProjects();
//   return projects.map((project) => ({ slug: project.slug }));
// }

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const project = getProjects().find((post) => post.slug === params.slug);

  if (!project) {
    return notFound();
  }

  let {
    title,
    publishedAt: publishedTime,
    description: description,
    image,
    tags,
  } = project.metadata;

  let ogImage = image
    ? `https://patelvivek.dev${image}`
    : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
    keywords: tags ? tags : [],
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
  const project = getProjects().find((post) => post.slug === params.slug);

  if (!project) {
    return notFound();
  }
  return (
    <div className='mx-auto mt-16 w-11/12 sm:mt-40'>
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
              <Suspense
                fallback={
                  <>
                    <Calendar />
                    <p>---</p>
                  </>
                }
              >
                <Calendar /> {formatDate(project.metadata.publishedAt!)} |{' '}
                {project.readingTime}
              </Suspense>
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
      </section>
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
