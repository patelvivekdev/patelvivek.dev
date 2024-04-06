import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlog } from '@/lib/get-blogs'
import { getViewsCount } from "@/app/data";
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils";

import { Calendar } from "lucide-react"

export async function generateMetadata({
  params,
}: { params: any }): Promise<Metadata | undefined> {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = blog.metadata;

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
      url: `https://patelvivek.dev/blog/${blog.slug}`,
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

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount(slug);
  return <p>{`${views ? views : "--"} views`}</p>;
}

export default async function Blog({ params }: { params: any }) {

  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="mt-40 w-4/5 mx-auto">
      <section>
        <h1 className="title font-medium text-2xl tracking-tighter">
          {blog.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <Suspense fallback={<Skeleton className="h-4 w-12 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="flex flex-row gap-2 items-center">
                <Calendar /> {" "}{formatDate(blog.metadata.publishedAt)}
              </span>
            </p>
          </Suspense>
          <Suspense fallback={<Skeleton className="h-4 w-12 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <Views slug={blog.slug} />
          </Suspense>
        </div>
        <hr />
        <article className="my-10 mx-auto max-w-none prose md:prose-lg lg:prose-xl prose-zinc dark:prose-invert prose-a:no-underline prose-a:text-blue-500">
          <Suspense fallback={<Skeleton />}>
            <CustomMDX>
              {blog.content}
            </CustomMDX>
          </Suspense>
        </article>
      </section>
    </div>
  );
}
