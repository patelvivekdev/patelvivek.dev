'use client'

import { useActionState } from 'react'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

import { sendMessage } from '@/app/actions'
import { Button } from '@/components/ui/button'

const initialState = {
  type: '',
  data: {
    name: '',
    email: '',
    message: '',
  },
  message: '',
  errors: undefined,
}

export default function ContactMeForm() {
  const [state, formAction, isPending] = useActionState(
    sendMessage,
    initialState,
  )

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message)
    }
  }, [state])

  return (
    <form
      action={formAction}
      className='form flex w-full flex-col rounded-lg bg-gray-700 p-4 dark:bg-white'
    >
      {state.type === 'error' && (
        <p className='bg-green-951 my-4 mb-2 rounded-md border-2 border-gray-300 p-2 text-lg text-red-600'>
          {state.message}
        </p>
      )}
      <div className='grid gap-2'>
        <div className='flex items-center'>
          <Label
            htmlFor='name'
            className='mt-4 text-sm text-white dark:text-gray-600'
          >
            Your Name
          </Label>
        </div>
        <Input
          id='name'
          type='input'
          name='name'
          defaultValue={state.data.name}
          placeholder='Enter your name'
          required
        />
        {state?.errors?.name && (
          <span id='name-error' className='text-sm text-red-600'>
            {state.errors.name.join(',')}
          </span>
        )}
      </div>
      <div className='grid gap-2'>
        <Label
          htmlFor='email'
          className='mt-4 text-sm text-white dark:text-gray-600'
        >
          Email
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='email@example.com'
          defaultValue={state.data.email}
          name='email'
          required
        />
        {state?.errors?.email && (
          <span id='email-error' className='text-sm text-red-600'>
            {state.errors.email.join(',')}
          </span>
        )}
      </div>
      <div className='grid gap-2'>
        <Label
          htmlFor='message'
          className='mt-4 text-sm text-white dark:text-gray-600'
        >
          Message
        </Label>
        <Textarea
          rows={5}
          placeholder='Type your message here.'
          defaultValue={state.data.message}
          name='message'
          required
        />
        {state?.errors?.message && (
          <span id='message-error' className='text-sm text-red-600'>
            {state.errors.message.join(',')}
          </span>
        )}
      </div>
      <Button
        type='submit'
        disabled={isPending}
        className='mt-4 bg-indigo-500 text-white'
      >
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
