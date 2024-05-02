import { Eye } from 'lucide-react';

export default function ViewCounter({
  slug,
  allViews,
}: {
  slug: string;
  allViews: {
    slug: string;
    views: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.views || 0).toLocaleString();

  return (
    <span className='text-base flex flex-row gap-2 items-center text-neutral-800 dark:text-gray-300'>
      <Eye />
      <p className='flex flex-row'>{`${number} Views `}</p>
    </span>
  );
}
