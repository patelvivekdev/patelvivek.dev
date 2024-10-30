'use server';

import supabase from '@/lib/supabase/private';

export async function getViewsCount(): Promise<
  { slug: string; views: number }[]
> {
  const { data, error } = await supabase
    .from('analytics')
    .select('slug, views');
  if (error) {
    console.log('error', error);
    return [];
  }

  return data;
}
