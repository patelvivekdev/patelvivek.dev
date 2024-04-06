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
            remarkGfm,
            remarkFrontmatter,
            remarkA11yEmoji,
            [
              remarkToc,
              {
                tight: true,
                maxDepth: 5,
              },
            ],
          ],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
      components={mdxComponents}
    />
  );
}
