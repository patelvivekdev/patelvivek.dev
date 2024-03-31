import type { Metadata } from "next";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  return {
    title: "Page Title",
    description: "Page Description",
  };
}

export default function Blog({ params }) {
    let post = "test"

    if (!post) {
      notFound();
    }
}