import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProject } from '@/lib/get-projects'
import { CustomMDX } from "@/components/mdx";
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils";

import { Calendar } from "lucide-react";

export async function generateMetadata({
  params,
}: { params: any }): Promise<Metadata | undefined> {
  const project = await getProject(params.id);

  if (!project) {
    return {}
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project.metadata;

  let ogImage = image
    ? `https://patelvivek.dev${image}`
    : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
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
    <div className="mt-40 w-4/5 mx-auto">
      <section>
        <h1 className="title font-medium text-2xl tracking-tighter">
          {project.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <Suspense fallback={<Skeleton className="h-4 w-12 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="flex flex-row gap-2 items-center">
                <Calendar /> {" "}{formatDate(project.metadata.publishedAt)}
              </span>
            </p>
          </Suspense>
        </div>
        <hr />
        <article className="my-10 mx-auto max-w-none prose md:prose-lg lg:prose-xl prose-zinc dark:prose-invert prose-a:no-underline prose-a:text-blue-500">
          <Suspense fallback={<Skeleton className="h-4 w-12 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <CustomMDX>
              {project.content}
            </CustomMDX>
          </Suspense>
        </article>
      </section>
    </div>
  );
}