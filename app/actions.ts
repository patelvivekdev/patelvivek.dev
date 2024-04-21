'use server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import supabase from '@/lib/supabase/private';
import { z } from 'zod';

//  Response type
type Response = {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
};

// =============================== Increment View ===============================
export async function increment(slug: string) {
  noStore();

  if (process.env.APP_ENV !== 'development') {
    const { error } = await supabase.rpc('increment', { blog_slug: slug });

    if (error) {
      console.error(error);
    }

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  }
}

// =============================== Send Message ===============================

const contactMessageSchema = z.object({
  name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email('Please enter valid message').min(5),
  message: z.string().min(5, { message: 'Must be 5 or more characters long' }),
});

export async function sendMessage(prevState: any, formData: FormData) {
  noStore();
  const validatedFields = contactMessageSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    message: formData.get('message'),
  });
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to register.',
    };
  }
  try {
    const { data, error } = await supabase.from('Message').upsert({
      email: validatedFields.data.email,
      message: validatedFields.data.message,
      name: validatedFields.data.name,
    });

    if (error) {
      console.log('Error', error);
      return {
        type: 'error',
        message: 'Database Error: Failed to send message.',
      };
    }
    return {
      type: 'success',
      message: 'Message sent successfully.',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      message: 'Database Error: Failed to send message.',
    };
  }

  // const { data, error } = await supabase.from('Message').upsert({ email: validatedFields.email, message: validatedFields.data.message, name: 'Albania' }).select();

  // if (error) {
  //   console.error(error);
  // }
}
