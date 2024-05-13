'use client';
import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

const Pre = (props: any) => {
  const textInput = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput?.current?.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <pre ref={textInput} className='flex flex-row justify-between gap-3'>
      <div className='overflow-x-auto p-2'>{props.children}</div>
      <button
        aria-label='Copy code'
        type='button'
        className='h-4 w-4'
        onClick={onCopy}
      >
        {copied ? (
          <Check className='text-[#80d1a9]' />
        ) : (
          <Copy className='text-white' />
        )}
      </button>
    </pre>
  );
};

export default Pre;
