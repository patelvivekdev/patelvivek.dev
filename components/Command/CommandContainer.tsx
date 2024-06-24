import getBlogs from '@/lib/get-blogs';
import { getProjects } from '@/lib/get-projects';
import getSnippets from '@/lib/get-snippets';
import { allTags } from '@/lib/get-tags';
import { CommandMenu } from './Command';

export function CommandContainer() {
  let blogs = getBlogs();
  blogs = blogs.filter((blog) => blog.metadata.published);
  let projects = getProjects();
  projects = projects.filter((project) => project.metadata.published);
  let snippets = getSnippets();
  snippets = snippets.filter((snippet) => snippet.metadata.published);
  let tags = Object.keys(allTags);

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
