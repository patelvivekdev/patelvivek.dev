import type { Metadata } from 'next';
import ContactMeForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Get in Touch | Vivek Patel',
  description: 'Want to get in touch? Reach out via social media for a quick response.',
};

const ContactPage = () => {
  return (
    <div className='mx-auto mt-40 h-full w-4/5'>
      <h1 className='text-4xl font-bold text-blue-600 text-center'>Get in Touch</h1>
      <h2 className='text-2xl text-center font-bold text-gray-800 dark:text-white'>
        {' '}
        Have a question? Fill out my contact form or reach out via social media for a quick response.
      </h2>
      <div className='grid grid-col-1 sm:grid-cols-2 gap-4 m-10'>
        <div className='flex justify-center flex-col gap-4'>
          <div className='flex flex-col gap-5'>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>Name:</span> Vivek Patel
            </p>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>Email:</span> me@patelvive.dev
            </p>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>Phone:</span> +1 519 731 9008
            </p>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>Address:</span> Kitchener, ON, Canada
            </p>
          </div>
          <div className='flex flex-col gap-5'>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>LinkedIn:</span> https://www.linkedin.com/in/vivekp0206
            </p>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>GitHub:</span> https://github.com/Vivek-0206
            </p>
            <p className='text-xl'>
              <span className='text-blue-600 font-bold'>Twitter:</span> https://twitter.com/Vivek0206_
            </p>
          </div>
        </div>
        <ContactMeForm />
      </div>
    </div>
  );
};

export default ContactPage;
