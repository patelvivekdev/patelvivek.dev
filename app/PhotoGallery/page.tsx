import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photo gallery.',
  keywords: 'photos, gallery, pictures',
};

const PhotoGallery = () => {
  return (
    <section className='mx-auto min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>Photo Gallery</h1>
      {/* Show that this page is still in development */}

      <p className='text-lg mt-4 text-gray-500'>This page is still in development. Check back later for more photos.</p>

      <Button variant='outline' className='mt-8 text-white bg-slate-700 hover:bg-slate-300'>
        Load More
      </Button>
    </section>
  );
};

export default PhotoGallery;
