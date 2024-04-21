'use client';
import { useState, useRef } from 'react';
import { Clipboard } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Pre = (props: any) => {
  const textInput = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
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
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className='relative'>
      {hovered && (
        <button aria-label='Copy code' type='button' className='absolute right-2 top-2 h-8 w-8' onClick={onCopy}>
          {copied ? <Clipboard className='text-[#80d1a9]' /> : <Clipboard />}
        </button>
      )}
      <pre>{props.children}</pre>
    </div>
  );
};

export default Pre;
