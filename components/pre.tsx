'use client';
import { useState, useRef } from 'react';
import { Clipboard } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Pre = (props: any) => {
  const textInput = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  const onExit = () => {
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput?.current?.textContent);
    toast.success('Copied to clipboard!', {
      position: 'bottom-center',
      duration: 2500,
    });
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <pre ref={textInput} onMouseLeave={onExit} className='flex flex-row justify-between gap-3'>
      {props.children}
      <button aria-label='Copy code' type='button' className='h-4 w-4' onClick={onCopy}>
        {copied ? <Clipboard className='text-[#80d1a9]' /> : <Clipboard className='text-white' />}
      </button>
    </pre>
  );
};

export default Pre;
