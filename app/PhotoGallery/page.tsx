import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photo gallery.',
  keywords: 'photos, gallery, pictures',
};

const PhotoGallery = () => {
  return (
    <section className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>Photo Gallery</h1>
      {/* Show that this page is still in development */}

      <p className='mt-4 text-lg text-gray-500'>
        This page is still in development. Check back later for more photos.
      </p>

      <Button
        variant='outline'
        className='mt-8 bg-slate-700 text-white hover:bg-slate-300'
      >
        Load More
      </Button>
    </section>
  );
};

export default PhotoGallery;
