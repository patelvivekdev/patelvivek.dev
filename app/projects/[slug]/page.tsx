import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import getProjects, { getProject } from '@/lib/get-projects';
import { CustomMDX } from '@/components/mdx';
import { formatDate } from '@/lib/utils';
import Progress from '@/components/ui/progress';

export async function generateStaticParams() {
  const posts = await getProjects();
  return posts.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  const project = await getProject(params.slug);

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
  const project = await getProject(params.slug);

  if (!project) {
    return notFound();
  }
  return (
    <div className='mx-auto mt-40 w-11/12 sm:w-3/4'>
      <Progress />
      <section>
        <h1 className='text-start text-2xl sm:text-4xl font-bold'>{project.metadata.title}</h1>
        <div className='mb-4 mt-2 flex items-center justify-between'>
          <p className='text-lg font-normal text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>{project.metadata.description}</span>
          </p>
        </div>
        <div className='mb-8 mt-2 flex items-center justify-between'>
          <p className='text-base text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar /> {formatDate(project.metadata.publishedAt)}
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
