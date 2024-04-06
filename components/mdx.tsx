import Link from "next/link";
import NextImage from "next/image";
import { MDXComponents } from 'mdx/types'
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import remarkToc from "remark-toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { cn } from "@/lib/utils";

const CustomLink = ({ children, ...props }: {
  children: any;
  [x: string]: any;
}) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} > {children} </a>
};

function Callout(props: any) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

function Code({ children, ...props }: { children: any;[x: string]: any }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        " mt-10 scroll-m-20 border-b border-b-gray-400 pb-1 text-3xl font-semibold tracking-tight text-black first:mt-0 dark:border-b-gray-700 dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600",
        className
      )}
      {...props}
    />
  ),
  a: CustomLink as any,
  Link: CustomLink as any,
  Callout,
  code: Code as React.ComponentType<any>, // Add type assertion here
  img: NextImage as React.ComponentType<any>, // Add type assertion here
};

export function CustomMDX({ children }: { children: string }) {
  return (
    <MDXRemote
      source={children}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // Adds support for GitHub Flavored Markdown
            remarkGfm,
            // Makes emojis more accessible
            remarkA11yEmoji,
            // generates a table of contents based on headings
            remarkToc,
          ],
          // These work together to add IDs and linkify headings
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
      components={mdxComponents}
    />
  );
}