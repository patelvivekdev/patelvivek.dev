import type { Metadata } from 'next';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Manage blog and projects',
};

export default async function Adminpage() {
  let session = await auth();
  if (session?.user?.email !== 'me@patelvivek.dev') {
    redirect('/');
  }

  return (
    <div>
      <h1>Admin page</h1>
    </div>
  );
}
