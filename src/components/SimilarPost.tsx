import { getSimilarPosts } from '@/lib/upstash';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
// import { Link } from 'next-view-transitions';

export default async function SimilarPost({
  slug,
  content,
  type,
}: {
  slug: string;
  content: string;
  type: 'blog' | 'project';
}) {
  const { relatedBlogs, relatedProjects } = await getSimilarPosts(
    slug,
    content,
    type,
  );
  return (
    <>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Related Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {relatedProjects.map((relatedProject) => (
              <li key={relatedProject.id}>
                <Link
                  href={`/projects/${relatedProject.metadata?.project ?? ''}`}
                  className='text-indigo-500 hover:underline'
                >
                  {relatedProject.metadata?.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Related Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {relatedBlogs.map((relatedBlog) => (
              <li key={relatedBlog.id}>
                <Link
                  href={`/blog/${relatedBlog.metadata?.blog ?? ''}`}
                  className='text-indigo-500 hover:underline'
                >
                  {relatedBlog.metadata?.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

export function SkeletonSimilarPost() {
  return (
    <>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Related Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {[...Array(3)].map((_, index) => (
              <li key={index}>
                <Skeleton className='h-5 w-3/4' />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Related Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {[...Array(3)].map((_, index) => (
              <li key={index}>
                <Skeleton className='h-5 w-3/4' />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
