import Link from "next/link";
import { Suspense } from "react";
import Card from "./Card";

export default function ProjectCard({
  title,
  description,
  link,
  tags,
}: {
  title: string;
  description: string;
  link: string;
  tags: string[];
}) {
  return (
    <Link
      href={link}
      className="w-full rounded-md p-4 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:hover:border-zinc-600"
    >
      <div className="w-full">
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="mb-2 w-full font-medium text-neutral-900 dark:text-neutral-100">
              {title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <span className="mr-2 text-sm text-left md:text-right font-semibold text-gray-900 dark:text-white">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-green-700 bg-green-100 rounded-lg dark:bg-green-700 dark:text-green-100"
              >
                {tag}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
