'use server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import supabase from '@/lib/supabase/private';

export async function increment(slug: string) {
  noStore();
  console.log('slug', slug);

  const { data, error } = await supabase.rpc('increment', { blog_slug: slug });

  if (error) {
    console.error(error);
  }

  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
}
