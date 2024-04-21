import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import readingDuration from 'reading-duration';

const BLOGS_FOLDER = path.join(process.cwd(), 'blogs');

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags: string;
  published: boolean;
};

export const getReadingTime = (content: string) => {
  const readingTime = readingDuration(content, {
    wordsPerMinute: 100,
    emoji: 'open_book',
  });
  return readingTime;
};

function getBlogFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

// function readBlogFile(filePath: string) {
//   return fs.readFileSync(filePath, 'utf-8');
// }

export const getBlogs = cache(() => {
  const posts = getBlogFiles(BLOGS_FOLDER);

  return posts.map((post) => {
    const filePath = path.join(BLOGS_FOLDER, post);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const readingTime = getReadingTime(content);
    return {
      metadata: data as Partial<Metadata>,
      readingTime: readingTime,
      content,
      slug: post.replace(/\.mdx?$/, ''),
    };
  });
});

export function getBlog(slug: string) {
  const blogs = getBlogs();
  const blog = blogs.find((blog) => blog.slug === slug);
  return blog;
}

export function getLatestBlogs() {
  const blogs = getBlogs();

  // Sort by date
  const allBlogs = blogs.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt!);
    const dateB = new Date(b.metadata.publishedAt!);
    return dateB.getTime() - dateA.getTime();
  });

  // Return the latest 3 blogs
  return allBlogs.slice(0, 3);
}

export default getBlogs;
