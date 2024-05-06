import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { getReadingTime } from './utils';

const PROJECTS_FOLDER = path.join(process.cwd(), 'content', 'projects');

type Metadata = {
  title: string;
  publishedAt: string;
  description: string;
  tags: string[];
  published: boolean;
  image?: string;
};

function getProjectFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

// function readProjectFile(filePath: string) {
//   return fs.readFileSync(filePath, 'utf-8');
// }

export const getProjects = cache(() => {
  const projects = getProjectFiles(PROJECTS_FOLDER);

  return projects.map((file) => {
    const filePath = path.join(PROJECTS_FOLDER, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const readingTime = getReadingTime(content);
    return {
      metadata: data as Partial<Metadata>,
      readingTime: readingTime,
      content,
      slug: file.replace(/\.mdx?$/, ''),
    };
  });
});

export function getProject(slug: string) {
  const projects = getProjects();
  const project = projects.find((post) => post.slug === slug);
  return project;
}

export function getLatestProjects() {
  const projects = getProjects();
  // Sort projects by publishedAt in descending order
  const sortedProjects = projects.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt!);
    const dateB = new Date(b.metadata.publishedAt!);
    return dateB.getTime() - dateA.getTime();
  });
  return sortedProjects.slice(0, 4);
}
