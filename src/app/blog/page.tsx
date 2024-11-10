'use cache';
import type { Metadata } from 'next';
import BlogPost from '@/components/BlogPost';
import { getBlogs } from '@/lib/get-blogs';

export const metadata: Metadata = {
  title: 'Read all the blogs I have written',
  description:
    'Get practical tips and insights on React, Next.js, and modern web development techniques from my blog.',
  keywords:
    'blogs, writing, articles, nextjs, react, javascript, web development, modern web development',
  openGraph: {
    title: 'Read all the blogs I have written',
    description:
      'Get practical tips and insights on React, Next.js, and modern web development techniques from my blog.',
    url: 'https://patelvivek.dev/blog',
    siteName: 'Vivek Patel',
    images: [
      {
        url: 'https://patelvivek.dev/og?title=Read%20all%20the%20blogs%20I%20have%20written',
        width: 1200,
        height: 630,
        alt: 'Read all the blogs I have written',
      },
    ],
  },
};

const BlogPage = async () => {
  'use cache';
  let allBlogs = await getBlogs();

  allBlogs = allBlogs.filter((blog) => blog.metadata.published);

  // sort by date
  allBlogs = allBlogs.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt!);
    const dateB = new Date(b.metadata.publishedAt!);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className='mx-auto mt-16 flex w-11/12 flex-col items-center gap-4 sm:mt-40'>
      <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        All Blogs
      </h1>
      <div className='flex flex-col justify-center gap-4'>
        {allBlogs.length > 0 ? (
          allBlogs.map((blog) => (
            <BlogPost
              key={blog.slug}
              title={blog.metadata.title!}
              summary={blog.metadata.summary!}
              slug={blog.slug}
              readingTime={blog.readingTime}
              publishedAt={blog.metadata.publishedAt!}
              tags={blog.metadata.tags!}
              views={false}
            />
          ))
        ) : (
          <p className='bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-xl text-transparent'>
            No blogs found
          </p>
        )}
      </div>
      <h2 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        Medium
      </h2>
      <div className='mb-10 flex flex-col justify-center gap-4'>
        {/* Medium */}
        <BlogPost
          title='End-to-End CNN using TensorFlow'
          summary='How to create an End-to-End deep learning solution from data gathering to deploy the model into Heroku.'
          slug='https://towardsdatascience.com/end-to-end-cnn-using-tensorflow-4c7d9af3ca4c'
          publishedAt='Dec 4, 2020'
          views={2875}
          readingTime={'📖 8 min read'}
          tags={['machine learning', 'deep learning']}
          external
        />
        <BlogPost
          title='Convert Your Jupyter-notebook to Github pages with Github-action'
          summary='How cool if you convert that notebook into a blog within less than 5 min?'
          slug='https://medium.com/analytics-vidhya/convert-your-jupyter-notebook-to-github-pages-with-github-action-fa2ce9b4182a'
          publishedAt='Oct 24, 2020'
          views={3453}
          readingTime={'📖 3 min read'}
          tags={['github', 'github action', 'jupyter notebook']}
          external
        />
        {/* <BlogPost
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
          /> */}
      </div>
    </div>
  );
};

export default BlogPage;
