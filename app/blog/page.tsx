import type { Metadata } from 'next';
import BlogPost from '@/components/BlogPost';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';
import { getBlogs } from '@/lib/get-blogs';

export const metadata: Metadata = {
  title: 'Read all the blogs I have written',
  description: 'Get practical tips and insights on React, Next.js, and modern web development techniques from my blog.',
  keywords: 'blogs, writing, articles, nextjs, react, javascript, web development, modern web development',
};

const BlogPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  getBlogs();
  let allBlogs = await getBlogs();

  // sort by date
  allBlogs = allBlogs.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt);
    const dateB = new Date(b.metadata.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredBlogs = allBlogs.filter((blog) => blog.metadata.title.toLowerCase().includes(query.toLowerCase()));

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
    <div className='mt-40 flex flex-col items-center'>
      {/* add hidden div to set height of screen */}
      <h3 className='text-center text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl'>
        {/* if query Display the number of blogs found */}
        {query ? (
          <span>
            {filteredBlogsLength} blog{filteredBlogs.length === 1 ? '' : 's'} found for query
            <span className='text-c'> {query}</span>
          </span>
        ) : (
          'All Blogs'
        )}
        <hr />
      </h3>

      <div className='grid w-4/5 grid-cols-1 gap-4 p-5 sm:p-10'>
        <div className='flex flex-col justify-center gap-4'>
          <Search placeholder='Search blog title' />
          {/* if query display filteredBlogs else show all blog */}
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogPost
                key={blog.slug}
                title={blog.metadata.title}
                summary={blog.metadata.summary}
                slug={blog.slug}
                publishedAt={blog.metadata.publishedAt}
                tags={blog.metadata.tags}
              />
            ))
          ) : (
            <p className='bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-xl text-transparent'>
              No blogs found
            </p>
          )}
          {/* if totalPages > 0 */}
          {totalPages > 1 && (
            <div className='mt-5 flex w-full justify-center'>
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </div>
        <div className='mt-10 flex flex-col justify-center gap-4'>
          <h3 className='mb-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-2xl font-bold tracking-tight text-transparent md:text-4xl'>
            Medium
            <hr />
          </h3>
          {/* Medium */}
          <BlogPost
            title='End-to-End CNN using TensorFlow'
            summary='How to create an End-to-End deep learning solution from data gathering to deploy the model into Heroku.'
            slug='https://towardsdatascience.com/end-to-end-cnn-using-tensorflow-4c7d9af3ca4c'
            publishedAt='Dec 4, 2020'
            views={2506}
            external
          />
          <BlogPost
            title='Convert Your Jupyter-notebook to Github pages with Github-action'
            summary='How cool if you convert that notebook into a blog within less than 5 min?'
            slug='https://medium.com/analytics-vidhya/convert-your-jupyter-notebook-to-github-pages-with-github-action-fa2ce9b4182a'
            publishedAt='Oct 24, 2020'
            views={3453}
            external
          />
          <BlogPost
            title='End to end Mask detection'
            summary='How to create an End-to-End deep learning solution from data gathering to deploy the model into Heroku.'
            slug='https://medium.com/nerd-for-tech/end-to-end-mask-detection-24fb44a52523'
            publishedAt='Nov 22, 2020'
            views={458}
            external
          />
          <BlogPost
            title='Hands-on practice on machine learning'
            summary='Practical machine learning.'
            slug='https://patelvivekdotdev.medium.com/hands-on-practice-on-machine-learning-9782bfc66ce4'
            publishedAt='Oct 21, 2020'
            views={137}
            external
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
