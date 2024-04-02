import BlogPost from "@/components/BlogPost";
import Search from "@/components/Search";
import type { Metadata } from "next";

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

  const blogs = [
    {
      title: "First blog",
      summary: "This is the first blog",
      slug: "first-blog",
    },
    {
      title: "Second blog",
      summary: "This is the Second blog",
      slug: "second-blog",
    },
    {
      title: "Third blog",
      summary: "This is the Third blog",
      slug: "third-blog",
    },
  ];

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col items-center mt-40">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center text-black dark:text-white">
        {/* if query Display the number of blogs found */}
        {query ? (
          <span>
            {filteredBlogs.length} blog{filteredBlogs.length === 1 ? "" : "s"}{" "}
            found
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
          filteredBlogs.map((blog) => <BlogPost key={blog.slug} {...blog} />)
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            No blogs found
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
