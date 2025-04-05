import { getLatestBlogs } from '@/lib/get-blogs'
import BlogPost from '@/components/BlogPost'

export default async function RecentBlogs() {
  const blogs = await getLatestBlogs()

  return (
    <>
      {blogs.map((blog) => (
        <BlogPost
          key={blog.slug}
          title={blog.metadata.title!}
          summary={blog.metadata.summary!}
          publishedAt={blog.metadata.publishedAt!}
          slug={blog.slug}
          readingTime={blog.readingTime}
          tags={blog.metadata.tags!}
          views={false}
        />
      ))}
    </>
  )
}
