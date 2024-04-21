import { getBlogs } from '@/lib/get-blogs';
import BlogPost from '@/components/BlogPost';

export default function AdminPage() {
  // fetch all blogs that are in draft(published is false)
  let allBlogs = getBlogs();

  allBlogs = allBlogs.filter((blog) => !blog.metadata.published);

  return (
    <div>
      <h1>Admin blog page</h1>
      {allBlogs.map((blog) => (
        <BlogPost
          key={blog.slug}
          title={blog.metadata.title!}
          summary={blog.metadata.summary!}
          slug={blog.slug}
          readingTime={blog.readingTime}
          publishedAt={blog.metadata.publishedAt!}
          tags={blog.metadata.tags!}
        />
      ))}
    </div>
  );
}
