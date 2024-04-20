'use client';
import { useEffect } from 'react';
import { increment } from '@/app/actions';

export default function IncreaseView({ slug, published }: { slug: string; published: boolean }) {
  useEffect(() => {
    const registerView = async () => {
      if (published) {
        await increment(slug);
      }
    };

    registerView();
  }, [slug]);

  return <></>;
}
