import { getBlogs } from '@/lib/get-blogs';
import BlogPost from '@/components/BlogPost';

export default async function Adminpage() {
  // fetch all blogs that are in draft(publisged is false)
  let allBlogs = await getBlogs();

  return (
    <div>
      <h1>Admin blog page</h1>
      {allBlogs.map((blog) => (
        <BlogPost
          key={blog.slug}
          title={blog.metadata.title}
          summary={blog.metadata.summary}
          slug={blog.slug}
          readingTime={blog.readingTime}
          publishedAt={blog.metadata.publishedAt}
          tags={blog.metadata.tags}
        />
      ))}
    </div>
  );
}
