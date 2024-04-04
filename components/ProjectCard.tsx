import Link from "next/link";

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

  // short the tags in alphabetical order
  tags.sort();

  return (
    <Link
      href={link}
      className="w-full rounded-md p-4 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:hover:border-zinc-600"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  items-center">
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="mb-2 w-full text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {title}
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          </div>
          <span className="mr-2 text-sm flex flex-row flex-wrap justify-center sm:justify-end gap-2 font-semibold text-gray-900 dark:text-white">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-black bg-sky-700 rounded-lg dark:bg-sky-700 dark:text-white"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
