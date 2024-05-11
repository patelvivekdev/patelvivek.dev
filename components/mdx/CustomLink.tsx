/* eslint-disable no-useless-escape */
import Link from 'next/link';
import React from 'react';

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

export const CustomLink = ({
  children,
  ...props
}: {
  children: any;
  [x: string]: any;
}) => {
  const href = props.href;
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a
        href={`#${slugify(props.href as string)}`}
        id={slugify(props.href as string)}
        className='anchor'
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a target='_blank' rel='noopener noreferrer' {...props}>
      {' '}
      {children}{' '}
    </a>
  );
};
