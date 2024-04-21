import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { cache } from 'react';

const PROJECTS_FOLDER = path.join(process.cwd(), 'projects');

type Metadata = {
  title: string;
  publishedAt: string;
  description: string;
  image?: string;
  tags: string;
};

function getProjectFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readProjectFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8');
}

export const getProjects = cache(() => {
  console.log('getProjects');
  const projects = getProjectFiles(PROJECTS_FOLDER);

  return projects.map((file) => {
    const filePath = path.join(PROJECTS_FOLDER, file);
    const fileContent = readProjectFile(filePath);
    const { data, content } = matter(fileContent);
    return {
      metadata: data as Partial<Metadata>,
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
