/* eslint-disable no-useless-escape */
import React from 'react';
import NextImage from 'next/image';
import { MDXComponents } from 'mdx/types';
// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import { cn } from '@/lib/utils';
import Pre from './Pre';
import { Callout } from './Callout';
import { CustomLink } from './CustomLink';

function Code({ children, ...props }: { children: any; [x: string]: any }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'my-2 scroll-m-20 text-4xl font-bold text-black dark:text-white',
        className,
      )}
      {...props}
    >
      <a
        href={`#${slugify(props.children as string)}`}
        id={slugify(props.children as string)}
        className='anchor'
      />
      {props.children}
    </h1>
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'my-5 scroll-m-20 border-b border-b-gray-800 pb-1 !text-3xl font-semibold text-black first:mt-0 dark:border-b-gray-500 dark:text-white',
        className,
      )}
    >
      <a
        href={`#${slugify(props.children as string)}`}
        id={slugify(props.children as string)}
        className='anchor'
      />
      {props.children}
    </h2>
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'my-4 scroll-m-20 !text-2xl font-semibold text-black dark:text-white',
        className,
      )}
      {...props}
    >
      <a
        href={`#${slugify(props.children as string)}`}
        id={slugify(props.children as string)}
        className='anchor'
      />
      {props.children}
    </h3>
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'my-4 scroll-m-20 !text-xl font-semibold text-black dark:text-white',
        className,
      )}
      {...props}
    >
      <a
        href={`#${slugify(props.children as string)}`}
        id={slugify(props.children as string)}
        className='anchor'
      />
      {props.children}
    </h4>
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        'my-4 scroll-m-20 !text-lg font-semibold text-black dark:text-white',
        className,
      )}
      {...props}
    >
      <a
        href={`#${slugify(props.children as string)}`}
        id={slugify(props.children as string)}
        className='anchor'
      />
      {props.children}
    </h5>
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        'my-4 scroll-m-20 !text-base font-semibold text-black dark:text-white',
        className,
      )}
      {...props}
    >
      <a
        href={`#${slugify(props.children as string)}`}
        id={slugify(props.children as string)}
        className='anchor'
      />
      {props.children}
    </h6>
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600',
        className,
      )}
      {...props}
    />
  ),
  a: CustomLink as React.ComponentType<any>,
  Link: CustomLink as React.ComponentType<any>,
  Callout,
  code: Code as React.ComponentType<any>,
  img: NextImage as React.ComponentType<any>,
  pre: Pre,
};

export function CustomMDX({
  children,
  components,
}: {
  children: string;
  components: MDXComponents;
}) {
  return (
    <MDXRemote
      source={children}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // Makes emojis more accessible
            remarkA11yEmoji,
          ],
        },
      }}
      components={{ ...mdxComponents, ...(components || {}) }}
    />
  );
}
