import getBlogs from '@/lib/get-blogs';
import { getProjects } from '@/lib/get-projects';
import getSnippets from '@/lib/get-snippets';
import { CommandMenu } from './Command';

export function CommandContainer() {
  const blogs = getBlogs();
  const projects = getProjects();
  const snippets = getSnippets();

  return (
    <>
      <CommandMenu blogs={blogs} projects={projects} snippets={snippets} />
    </>
  );
}
