import getBlogs from '@/lib/get-blogs';
import { getProjects } from '@/lib/get-projects';
import getSnippets from '@/lib/get-snippets';
import { allTags } from '@/lib/get-tags';
import { CommandMenu } from './Command';

export function CommandContainer() {
  const blogs = getBlogs();
  const projects = getProjects();
  const snippets = getSnippets();
  const tags = Object.keys(allTags);

  tags.sort();

  return (
    <>
      <CommandMenu
        blogs={blogs}
        projects={projects}
        snippets={snippets}
        tags={tags}
      />
    </>
  );
}
