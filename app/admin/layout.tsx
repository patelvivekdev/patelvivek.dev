import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { auth } from '@/app/auth';
import { SignIn, SignOut } from '@/components/auth-components';

export const metadata: Metadata = {
  title: 'Patel Vivek',
  description: 'Personal website of Patel Vivek.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GuestbookForm />
      {children}
    </>
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}
