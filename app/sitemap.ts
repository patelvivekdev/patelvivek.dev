import getBlogs from '@/lib/get-blogs';
import getProjects from '@/lib/get-projects';

export default async function sitemap() {
  const posts = await getBlogs();
  const projects = await getProjects();
  const blogs = posts.map((post) => ({
    url: `https://patelvivek.dev/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt
      ? new Date(post.metadata.publishedAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }));

  const allProjects = projects.map((post) => ({
    url: `https://patelvivek.dev/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt
      ? new Date(post.metadata.publishedAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  }));

  const routes = ['', '/about', '/projects', '/blog'].map((route) => ({
    url: `https://patelvivek.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...allProjects ];
}
