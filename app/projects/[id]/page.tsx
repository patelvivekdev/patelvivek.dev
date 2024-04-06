import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { getProject } from '@/lib/get-projects'
import { CustomMDX } from "@/components/mdx";
import { Skeleton } from "@/components/ui/skeleton"

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

      <h1 className="text-4xl font-bold">{project.metadata.title}</h1>
      <p className="text-gray-500 mt-2">{project.metadata.publishedAt}</p>

      <hr />


      <Suspense fallback={<Skeleton />}>
        <CustomMDX>
          {project.content}
        </CustomMDX>
      </Suspense>
    </div>
  );
}