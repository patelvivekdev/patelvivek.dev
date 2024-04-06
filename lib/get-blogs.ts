import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { cache } from "react";

export const getBlogs = cache(async () => {
  const posts = await fs.readdir("./blog/");

  const blogs = posts
    .filter(
      (file) => path.extname(file) === ".md" || path.extname(file) === ".mdx"
    )
    .map(async (file) => {
      const filePath = path.join("./blog/", file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        metadata: data,
        content,
        slug: file.replace(/\.mdx?$/, ""),
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
  const sortedBlogs = blogs.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  // Return the latest 3 blogs
  return sortedBlogs.slice(0, 3);
}

export default getBlogs;
