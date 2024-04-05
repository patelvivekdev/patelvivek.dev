import type { Metadata } from "next";
import BlogPost from "@/components/BlogPost";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { getBlogs } from "@/lib/get-blogs";

export const metadata: Metadata = {
  title: "All Blogs",
  description: "All blogs I have written.",
  keywords: "blogs, writing, articles",
};

const BlogPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  let allBlogs = await getBlogs()
  // let allBlogs = getBlogPosts();

  // Get all tags
  // Here tags are stings separated by comma, so we need to convert it to array
  // then we need to flat the array and remove duplicates
  let tags = Array.from(new Set(allBlogs.map((blog) => blog.metadata.tags?.split(',')).flat()));



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

      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-3 gap-8 p-5 sm:p-10">
        <div className="col-span-3 sm:col-span-2">
          <div className="flex flex-col gap-4 justify-center">
            <Search placeholder="Search blog title" />
            {/* if query display filteredBlogs else show all blog */}
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => <BlogPost key={blog.slug} title={blog.metadata.title} summary={blog.metadata.summary} slug={blog.slug} publishedAt={blog.metadata.publishedAt} tags={blog.metadata.tags} />)
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
          <div className="flex flex-col gap-4 justify-center mt-10">
            <h3 className="mb-2 font-bold text-2xl md:text-4xl tracking-tight text-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
              Medium
              <hr />
            </h3>
            {/* Medium */}
            <BlogPost
              title="End-to-End CNN using TensorFlow"
              summary="How to create an End-to-End deep learning solution from data gathering to deploy the model into Heroku."
              slug="https://towardsdatascience.com/end-to-end-cnn-using-tensorflow-4c7d9af3ca4c"
              publishedAt="Dec 4, 2020"
              external
            />
            <BlogPost
              title="Convert Your Jupyter-notebook to Github pages with Github-action"
              summary="How cool if you convert that notebook into a blog within less than 5 min?"
              slug="https://medium.com/analytics-vidhya/convert-your-jupyter-notebook-to-github-pages-with-github-action-fa2ce9b4182a"
              publishedAt="Oct 24, 2020"
              external
            />
            <BlogPost
              title="End to end Mask detection"
              summary="How to create an End-to-End deep learning solution from data gathering to deploy the model into Heroku."
              slug="https://medium.com/nerd-for-tech/end-to-end-mask-detection-24fb44a52523"
              publishedAt="Nov 22, 2020"
              external
            />
            <BlogPost
              title="Hands-on practice on machine learning"
              summary="Practical machine learning."
              slug="https://patelvivekdotdev.medium.com/hands-on-practice-on-machine-learning-9782bfc66ce4"
              publishedAt="Oct 21, 2020"
              external
            />
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <div className="flex flex-col gap-4 justify-center">
            {/* SHow tags */}
            <h3 className="mb-2 font-bold text-2xl md:text-4xl tracking-tight text-center ">
              Tags
              <hr />
            </h3>
            <div className="flex flex-col gap-4">
              {tags.map((tag) => (
                <span key={tag} className="text-center text-xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
