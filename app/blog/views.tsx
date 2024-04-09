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
  const number = new Number(viewsForSlug?.views || 0);

  return <p className='text-base text-gray-700 dark:text-gray-300'>{`${number.toLocaleString()} Views`}</p>;
}
