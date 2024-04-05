import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { cache } from "react";

export const getBlogs = cache(async () => {
  const posts = await fs.readdir("./blog/");

  const postsWithMetadata = await Promise.all(
    posts
      .filter(
        (file) => path.extname(file) === ".md" || path.extname(file) === ".mdx"
      )
      .map(async (file) => {
        const filePath = path.join("./blog/", file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        if (data.published === false) {
          return null;
        }

        return {
          metadata: data,
          content,
          slug: file.replace(/\.mdx?$/, ""),
        };
      })
  );

  return postsWithMetadata.filter((post) => post !== null);
});

export async function getBlog(slug: string) {
  const blogs = await getBlogs();
  const blog = blogs.find((blog) => blog?.slug === slug);
  return blog;
}

export default getBlogs;
