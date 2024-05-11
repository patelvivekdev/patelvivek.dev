'use server';

import { unstable_noStore as noStore } from 'next/cache';
import supabase from '@/lib/supabase/private';

export async function getViewsCount(): Promise<
  { slug: string; views: number }[]
> {
  noStore();
  const { data, error } = await supabase
    .from('analytics')
    .select('slug, views');
  if (error) {
    console.log('error', error);
    return [];
  }

  return data;
}
