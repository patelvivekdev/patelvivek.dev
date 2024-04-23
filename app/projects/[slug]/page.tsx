import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getProject } from '@/lib/get-projects';
import { CustomMDX } from '@/components/mdx';
import { formatDate } from '@/lib/utils';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// export function generateStaticParams() {
//   const posts = getProjects();
//   return posts.map((project) => ({ slug: project.slug }));
// }

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

export default function Project({ params }: { params: any }) {
  const project = getProject(params.slug);

  if (!project) {
    return notFound();
  }
  return (
    <div className='mx-auto mt-40 w-11/12 sm:w-3/4'>
      <Progress />
      <section>
        <Link href='/projects'>
          <Button
            variant='outline'
            className='
          mb-5 cursor-pointer text-lg font-semibold 
          border-gray-500  bg-gray-300 text-gray-800 hover:bg-gray-600 hover:text-gray-300 
          dark:border-gray-500 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200'
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
              <Calendar /> {formatDate(project.metadata.publishedAt!)}
            </span>
          </p>
        </div>
        <hr />
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
