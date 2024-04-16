import path from 'path';
import matter from 'gray-matter';
import fs from 'fs/promises';
import { cache } from 'react';
import readingDuration from 'reading-duration';

export const getReadingTime = (content: string) => {
  const readingTime = readingDuration(content, {
    wordsPerMinute: 100,
    emoji: 'open_book',
  });
  return readingTime;
};

const BLOGS_FOLDER = path.join(process.cwd(), 'blogs');

export const getBlogs = cache(async () => {
  const posts = await fs.readdir(BLOGS_FOLDER);

  const blogs = posts
    .filter((file) => path.extname(file) === '.md' || path.extname(file) === '.mdx')
    .map(async (file) => {
      const filePath = path.join(BLOGS_FOLDER, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const readingTime = getReadingTime(content);

      return {
        metadata: data,
        readingTime: readingTime,
        content,
        slug: file.replace(/\.mdx?$/, ''),
      };
    });

  return Promise.all(blogs);
});

export async function getBlog(slug: string) {
  const blogs = await getBlogs();
  const blog = blogs.find((blog) => blog.slug === slug);
  return blog;
}

export async function getLatestBlogs() {
  const blogs = await getBlogs();

  // Sort by date
  const allBlogs = blogs.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt);
    const dateB = new Date(b.metadata.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  // Return the latest 3 blogs
  return allBlogs.slice(0, 3);
}

export default getBlogs;
