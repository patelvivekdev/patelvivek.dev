'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { toast } from 'react-hot-toast';

import { sendMessage } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
};

export default function ContactMeForm() {
  const [state, formAction] = useFormState<any>(sendMessage as any, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className='form rounded-lg dark:bg-white bg-gray-700 p-4  w-full flex flex-col'
      key={state?.resetKey}
    >
      {state?.type === 'error' && (
        <p className='text-lg mb-2 bg-green-951 text-red-600 border-2 border-gray-300 rounded-md p-2 my-4'>{state.message}</p>
      )}
      <div className='grid gap-2'>
        <div className='flex items-center'>
          <Label htmlFor='name' className='text-sm text-white dark:text-gray-600 mt-4'>
            Your Name
          </Label>
        </div>
        <Input id='name' type='input' name='name' placeholder='Enter your name' required />
        {state?.errors?.name && (
          <span id='name-error' className='text-red-600 text-sm'>
            {state.errors.name.join(',')}
          </span>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='email' className='text-sm text-white dark:text-gray-600 mt-4'>
          Email
        </Label>
        <Input id='email' type='email' placeholder='m@example.com' name='email' required />
        {state?.errors?.email && (
          <span id='email-error' className='text-red-600 text-sm'>
            {state.errors.email.join(',')}
          </span>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='message' className='text-sm text-white dark:text-gray-600 mt-4'>
          Message
        </Label>
        <Textarea rows={5} placeholder='Type your message here.' name='message' required />
        {state?.errors?.message && (
          <span id='message-error' className='text-red-600 text-sm'>
            {state.errors.message.join(',')}
          </span>
        )}
      </div>
      <SubmitButton name='submit' className='mt-4 bg-indigo-500 text-white' />
    </form>
  );
}
