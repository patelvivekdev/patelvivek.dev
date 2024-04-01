import Link from "next/link";
import { Suspense } from "react";
import Card from "./Card";

export default function ProjectCard({
  title,
  description,
  link,
  image,
  tags,
}: {
  title: string;
  description: string;
  link: string;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
}) {
  return (
    <Link href={link}>
      <div className="flex items-center justify-around">
        <Card
          title={title}
          description={description}
          image={image}
          tags={tags}
        />
      </div>
    </Link>
  );
}
