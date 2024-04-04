import type { Metadata } from "next";
import BlogPost from "@/components/BlogPost";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { getBlogPosts } from '@/app/data';

export const metadata: Metadata = {
  title: "All Blogs",
  description: "All blogs I have written.",
  keywords: "blogs, writing, articles",
};

const BlogPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  let allBlogs = getBlogPosts();

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.metadata.title.toLowerCase().includes(query.toLowerCase())
  );

  const blogsPerPage = 5;
  let totalPages = 0;
  let filteredBlogsLength = filteredBlogs.length;

  if (query) {
    totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  } else {
    totalPages = Math.ceil(allBlogs.length / blogsPerPage);
  }

  filteredBlogs.splice(0, (currentPage - 1) * blogsPerPage);
  filteredBlogs.splice(blogsPerPage, filteredBlogs.length);

  return (
    <div className="flex flex-col items-center mt-40">
      {/* add hidden div to set height of screen */}
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center text-black dark:text-white">
        {/* if query Display the number of blogs found */}
        {query ? (
          <span>
            {filteredBlogsLength} blog{filteredBlogs.length === 1 ? "" : "s"}{" "}
            found for query
            <span className="text-c"> {query}</span>
          </span>
        ) : (
          "All Blogs"
        )}
        <hr />
      </h3>

      <div className="w-4/5 grid grid-cols-1 gap-4 p-5 sm:p-10">
        <Search placeholder="Search blog title" />
        {/* if query display fileterdblog else show all blog */}
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogPost key={blog.slug} title={blog.metadata.title} summary={blog.metadata.summary} slug={blog.slug} publishedAt={blog.metadata.publishedAt} />)
        ) : (
          <p className="text-center text-xl bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
            No blogs found
          </p>
        )}
        {/* if totalPages > 0 */}
        {totalPages > 1 && (
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </div>
      {/* External Blog I have write */}
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 sm:p-10">
        <div>
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
            Medium
            <hr />
          </h3>
          {/* Medium */}
          <BlogPost
            title="Read my blogs on Medium"
            summary="Occasionally I write on Medium"
            slug="https://patelvivekdotdev.medium.com/"
            external
          />
        </div>
        <div>
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
            Dev.to
            <hr />
          </h3>
          {/* Dev.to */}
          <BlogPost
            title="Read my blogs on Dev.to"
            summary="A small guide to get started with Dev.to"
            slug="https://dev.to/vivek-0206"
            external
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
