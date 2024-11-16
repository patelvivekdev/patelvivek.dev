import getBlogs from '@/lib/get-blogs';
import { getProjects } from '@/lib/get-projects';
import getSnippets from '@/lib/get-snippets';
import { allTags } from '@/lib/get-tags';
import { CommandMenu } from './Command';

export async function CommandContainer() {
  let blogs = await getBlogs();
  blogs = blogs.filter((blog) => blog.metadata.published);
  let projects = await getProjects();
  projects = projects.filter((project) => project.metadata.published);
  let snippets = await getSnippets();
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
