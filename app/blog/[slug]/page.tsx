import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlog } from '@/lib/get-blogs'
import { getViewsCount } from "@/app/data";
import { Skeleton } from "@/components/ui/skeleton"

import { unstable_noStore as noStore } from "next/cache";

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

function formatDate(date: string) {
  noStore();
  // date format: April 2, 2024
  let currentDate = new Date();
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.metadata.title,
              datePublished: blog.metadata.publishedAt,
              dateModified: blog.metadata.publishedAt,
              description: blog.metadata.summary,
              image: blog.metadata.image
                ? `https://patelvivek.dev${blog.metadata.image}`
                : `https://patelvivek.dev/og?title=${blog.metadata.title}`,
              url: `https://patelvivek.dev/blog/${blog.slug}`,
              author: {
                "@type": "Person",
                name: "Vivek Patel",
              },
            }),
          }}
        />
        <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
          {blog.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
          <Suspense fallback={<Skeleton className="h-4 w-12 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(blog.metadata.publishedAt)}
            </p>
          </Suspense>
          <Suspense fallback={<Skeleton className="h-4 w-12 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <Views slug={blog.slug} />
          </Suspense>
        </div>
        <hr />
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          <CustomMDX>
            {blog.content}
          </CustomMDX>
        </article>
      </section>
    </div>
  );
}
