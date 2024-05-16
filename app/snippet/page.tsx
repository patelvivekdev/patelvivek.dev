import type { Metadata } from 'next';
import getSnippets from '@/lib/get-snippets';
import SnippetCard from '@/components/SnippetCard';

export const metadata: Metadata = {
  title: 'Reusable Snippets',
  description: 'A collection of reusable snippets for Next.js',
  keywords: 'reusable, snippets, next.js',
  openGraph: {
    title: 'Reusable Snippets',
    description: 'A collection of reusable snippets for Next.js',
    url: 'https://patelvivek.dev/snippets',
    siteName: 'Vivek Patel',
    images: [
      {
        url: 'https://patelvivek.dev/og?title=Reusable%20Snippets',
        width: 1200,
        height: 630,
        alt: 'Reusable Snippets',
      },
    ],
  },
};

const SnippetPage = () => {
  let allSnippets = getSnippets();

  allSnippets = allSnippets.filter((snippet) => snippet.metadata.published);

  allSnippets = allSnippets.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt!);
    const dateB = new Date(b.metadata.publishedAt!);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className='mx-auto mb-8 mt-16 flex min-h-screen w-11/12 flex-col items-center gap-4 sm:mt-40 '>
      <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        {' '}
        All Snippets
      </h1>
      <h3 className='text-base'>Here are some of reusable snippets</h3>
      <div className='flex flex-col justify-center gap-4'>
        {allSnippets.length > 0 ? (
          allSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.slug}
              title={snippet.metadata.title!}
              description={snippet.metadata.description!}
              slug={snippet.slug}
              readingTime={snippet.readingTime}
              publishedAt={snippet.metadata.publishedAt!}
              tags={snippet.metadata.tags!}
              views={true}
            />
          ))
        ) : (
          <p className='bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-xl text-transparent'>
            No snippets found
          </p>
        )}
      </div>
    </div>
  );
};

export default SnippetPage;
