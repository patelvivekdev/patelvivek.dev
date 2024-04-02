import Link from "next/link";
import { Suspense } from "react";
import { getViewsCount } from "@/app/data";

const BlogPost = ({
  title,
  summary,
  slug,
}: {
  title: string;
  summary: string;
  slug: string;
}) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="w-full rounded-md p-4 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:hover:border-zinc-600"
    >
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <h4 className="mb-2 w-full font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </h4>
          <p className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
            <Suspense fallback={<p className="h-6" />}>
              <Views slug={slug} />
            </Suspense>
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{summary}</p>
      </div>
    </Link>
  );
};

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount(slug);
  return <>{`${views ? views : "--"} views`}</>;
}

export default BlogPost;