export default function Loading() {
  return (
    <>
      <p>Loading Projects</p>
      <div className='flex flex-row items-center justify-center gap-4'>
        <div className='h-12 w-12 animate-pulse rounded-full bg-gray-200' />
        <div className='h-7 w-48 animate-pulse rounded bg-gray-200' />
      </div>
    </>
  );
}
