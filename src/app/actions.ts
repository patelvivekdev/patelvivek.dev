/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { saveMessage } from '@/db/query/message';
import { z } from 'zod';

// =============================== Send Message ===============================
const contactMessageSchema = z.object({
  name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email('Please enter valid message').min(5),
  message: z.string().min(5, { message: 'Must be 5 or more characters long' }),
});

export async function sendMessage(prevState: any, formData: FormData) {
  const validatedFields = contactMessageSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    message: formData.get('message'),
  });
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      data: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      },
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Please fill all the fields.',
    };
  }
  try {
    await saveMessage(validatedFields.data);

    return {
      type: 'success',
      data: {
        name: '',
        email: '',
        message: '',
      },
      message: 'Message sent successfully.',
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        message: validatedFields.data.message,
      },
      message: error.message || 'Failed to send message. Please try again.',
    };
  }
}
