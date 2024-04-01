import Image from "next/image";

const Card = ({
  title,
  description,
  image,
  tags,
}: {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  } | null;
  tags: string[];
}) => {
  return (
    <div className="rounded-2xl max-w-sm shadow bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700 border border-gray-200 group-hover:border-zinc-700 relative z-20">
      <div className="z-20">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            className="rounded-t-2xl"
            priority={true}
          />
        )}
        <div className="p-5">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="mr-2 text-sm font-semibold text-gray-900 dark:text-white">
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
    </div>
  );
};

export default Card;
