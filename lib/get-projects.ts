import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";
import { cache } from "react";

export const getProjects = cache(async () => {
  const projects = await fs.readdir("./projects/");

  const projectsWithMetadata = await Promise.all(
    projects
      .filter(
        (file) => path.extname(file) === ".md" || path.extname(file) === ".mdx"
      )
      .map(async (file) => {
        const filePath = path.join("./projects/", file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        return {
          metadata: data,
          content,
          slug: file.replace(/\.mdx?$/, ""),
        };
      })
  );

  return projectsWithMetadata.filter((post) => post !== null);
});

export async function getProject(slug: string) {
  const projects = await getProjects();
  const project = projects.find((post) => post.slug === slug);
  return project;
}

export default getProjects;
