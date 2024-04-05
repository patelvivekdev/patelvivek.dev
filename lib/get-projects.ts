import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { cache } from "react";

export const getPosts = cache(async () => {
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

export async function getPost(slug: string) {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);
  return post;
}

export default getPosts;
