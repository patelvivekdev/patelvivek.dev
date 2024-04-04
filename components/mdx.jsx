import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";

function Table({ data }) {
    let headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ));
    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

const CustomLink = (props) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props} />
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function Callout(props) {
    return (
        <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">{props.emoji}</div>
            <div className="w-full callout">{props.children}</div>
        </div>
    );
}

function Code({ children, ...props }) {
    let codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

let components = {
    Image,
    a: CustomLink,
    Callout,
    code: Code,
    Table,
};

export function CustomMDX(props) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
        />
    );
}
