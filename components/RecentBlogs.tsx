import { getLatestBlogs } from '@/lib/get-blogs';
import BlogPost from '@/components/BlogPost';
import RecentBlogsSkeleton from '@/components/skeletons/RecentBlogsSkeleton';
import { Suspense } from 'react';

export default function RecentBlogs() {
  let blogs = getLatestBlogs();

  blogs = blogs.filter((blog) => blog.metadata && blog.metadata.published === true);

  return (
    <>
      {blogs.length === 0 ? (
        <p className='bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-xl text-transparent'>
          No blogs found
        </p>
      ) : (
        blogs.map((blog) => (
          <Suspense key={blog.slug} fallback={<RecentBlogsSkeleton />}>
            <BlogPost
              title={blog.metadata.title!}
              summary={blog.metadata.summary!}
              publishedAt={blog.metadata.publishedAt!}
              slug={blog.slug}
              readingTime={blog.readingTime}
              tags={blog.metadata.tags!}
              views={false}
            />
          </Suspense>
        ))
      )}
    </>
  );
}
