import Link from "next/link";
import { Suspense } from "react";
import { getViewsCount } from "@/app/data";
import { Skeleton } from "@/components/ui/skeleton"


const BlogPost = ({
  title,
  summary,
  slug,
  external,
}: {
  title: string;
  summary: string;
  slug: string;
  external?: boolean;
}) => {
  return (
    <>
      {external ? (
        <ExternalBlogPost title={title} summary={summary} slug={slug} />
      ) : (
        <InternalBlogPost title={title} summary={summary} slug={slug} />
      )}
    </>
  );
};

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount(slug);
  return <p>{`${views ? views : "--"} views`}</p>;
}

export default BlogPost;

function InternalBlogPost({
  title,
  summary,
  slug,
}: {
  title: string;
  summary: string;
  slug: string;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="rounded-md p-4 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:hover:border-zinc-600"
    >
      <div className="flex flex-col md:flex-row justify-between">
        <h4 className="mb-2 w-full font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </h4>
        <div className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
          <Suspense fallback={<Skeleton className="h-4 bg-slate-300 dark:bg-slate-100 rounded-full" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{summary}</p>
    </Link>
  );
}

function ExternalBlogPost({
  title,
  summary,
  slug,
}: {
  title: string;
  summary: string;
  slug: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
      <a href={slug} target="_blank" rel="noopener noreferrer">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">{summary}</p>
      </a>
    </div>
  );
}
