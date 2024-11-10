import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className='animate-pulse space-y-4'>
      <div className='h-6 w-3/4 rounded bg-gray-300'></div>
      <div className='h-6 w-1/2 rounded bg-gray-300'></div>
      <div className='h-6 w-full rounded bg-gray-300'></div>
      <div className='h-6 w-5/6 rounded bg-gray-300'></div>
      <div className='h-6 w-2/3 rounded bg-gray-300'></div>
    </div>
  );
};

export default SkeletonLoader;
