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

  const routes = ['', '/about', '/projects', '/blog', '/contact'].map((route) => ({
    url: `https://patelvivek.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // Other pages for which you want to create sitemap
  const staticPaths = [
    '/home',
    '/Project',
    '/PhotoGallery',
    '/resume',
    '/blog/first-blog',
    '/blog/second-blog',
    '/blog/third-blog',
    '/projects/1',
    '/projects/2',
    '/projects/3',
    '/projects/first-project',
    '/projects/second-project',
    '/projects/third-project',
    '/Vivek-Resume.pdf',
    '/rss',
    '/feed',
    '/atom',
  ];
  const staticPages = staticPaths.map((page) => ({
    url: `https://patelvivek.dev${page}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...allProjects, ...staticPages];
}
