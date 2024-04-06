import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact me.',
  keywords: 'contact, email, phone, address',
};

const ContactPage = () => {
  return (
    <div className='mt-40 flex h-screen flex-col items-center'>
      <h1 className='text-4xl'>Contact Page</h1>
    </div>
  );
};

export default ContactPage;
