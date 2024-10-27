import getBlogs from '@/lib/get-blogs';
import { getProjects } from '@/lib/get-projects';
import getSnippets from '@/lib/get-snippets';

export default async function sitemap() {
  let posts = await getBlogs();
  posts = posts.filter((post) => post.metadata.published);
  const blogs = posts.map((post) => ({
    url: `https://patelvivek.dev/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt!
      ? new Date(post.metadata.publishedAt!).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }));

  const projects = await getProjects();
  const allProjects = projects.map((post) => ({
    url: `https://patelvivek.dev/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt!
      ? new Date(post.metadata.publishedAt!).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }));

  let snippets = await getSnippets();
  snippets = snippets.filter((snippet) => snippet.metadata.published);
  const allSnippets = snippets.map((snippet) => ({
    url: `https://patelvivek.dev/snippet/${snippet.slug}`,
    lastModified: snippet.metadata.publishedAt!
      ? new Date(snippet.metadata.publishedAt!).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }));

  const routes = [
    '',
    '/home',
    '/projects',
    '/blog',
    '/snippet',
    '/contact',
  ].map((route) => ({
    url: `https://patelvivek.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...allProjects, ...allSnippets];
}
