import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { getReadingTime } from './utils';

const SNIPPETS_FOLDER = path.join(process.cwd(), 'content', 'snippets');

type Metadata = {
  title: string;
  publishedAt: string;
  description: string;
  tags: string[];
  published: boolean;
  image?: string;
};

function getMdxFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export const getSnippets = cache(() => {
  const snippets = getMdxFiles(SNIPPETS_FOLDER);

  return snippets.map((snippet) => {
    const filePath = path.join(SNIPPETS_FOLDER, snippet);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const readingTime = getReadingTime(content);
    return {
      metadata: data as Partial<Metadata>,
      readingTime: readingTime,
      content,
      slug: snippet.replace(/\.mdx?$/, ''),
    };
  });
});

export function getSnippet(slug: string) {
  let snippets = getSnippets();
  if (process.env.APP_ENV !== 'development') {
    snippets = snippets.filter((snippet) => snippet.metadata && snippet.metadata.published === true);
  }
  const snippet = snippets.find((snippet) => snippet.slug === slug);
  return snippet;
}

export default getSnippets;

export function getSnippetsByTag(tag: string) {
  let snippets = getSnippets();
  snippets = snippets.filter((snippet) => snippet.metadata && snippet.metadata.published === true);
  const filteredSnippets = snippets.filter(
    (snippet) => snippet.metadata.tags!.filter((t) => t.toLowerCase() === tag.toLowerCase()).length > 0,
  );
  return filteredSnippets;
}
