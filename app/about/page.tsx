import type { Metadata } from 'next';
import { About } from './About';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About me.',
  keywords: 'about, me, bio, resume',
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
