import BlogPost from "@/components/BlogPost";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLatestBlogs } from "@/lib/get-blogs";


export default async function Home() {
  const blogs = await getLatestBlogs()

  return (
    <div className="w-full dark:bg-[#111010] bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.8] relative flex flex-col gap-3 sm:gap-5 items-center">
      {/* <div className="absolute pointer-events-none inset-0 flex items-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div> */}
      <Hero />
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center text-black dark:text-white">
        Latest Project
        <hr />
      </h3>
      <div className="w-4/5 grid grid-cols-1 gap-4 p-5 sm:p-10">
        <ProjectCard
          title="Market-hub"
          description="Market-hub is a MERN-powered platform for buying and selling computer items. Vendors can easily manage their products, while users enjoy a smooth shopping experience. It's a user-friendly solution for tech enthusiasts and sellers alike."
          link="projects/market-hub"
          tags={["MERN", "React", "Nodejs", "Express", "MongoDB", "FullStack"]}
        />
        <ProjectCard
          title="Acme Auth"
          description="Acme Auth is a learning project focused on integrating third-party authentication APIs. It covers registration, login, logout, password recovery, and email verification. With a responsive design and efficient routing, it showcases modern web development practices using Next.js server actions and Tailwind CSS. "
          link="projects/acme-auth"
          tags={["Nextjs", "AppRouter", "ShadcnUI", "TailwindCSS", "Authentication", "FreeAPI", "RESTAPI", "ServerActions", "TypeScript"]}
        />
      </div>

      <Link href="/projects" >
        <Button variant="outline" className="text-lg mb-5 font-semibold text-gray-900 border-gray-800  hover:bg-gray-600 hover:text-gray-300 dark:border-white dark:text-white dark:hover:bg-gray-200 dark:hover:text-gray-600 cursor-pointer">
          View all projects &rarr;
        </Button>
      </Link>

      {/* Most viewed Blogs */}
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center text-black dark:text-white">
        Recent Blog
        <hr />
      </h3>
      <div className="w-4/5 grid grid-cols-1 gap-4 p-5 sm:p-10">
        {/* Show no blogs if there are no blogs */}

        {blogs.length === 0 ? (
          <p className="text-center text-xl bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
            No blogs found
          </p>
        ) : (
          blogs.map((blog) => (
            <BlogPost
              key={blog.slug}
              title={blog.metadata.title}
              summary={blog.metadata.summary}
              publishedAt={blog.metadata.publishedAt}
              slug={blog.slug}
              tags={blog.metadata.tags}
            />
          ))
        )}
      </div>

      <Link href="/blogs" >
        <Button variant="outline" className="text-lg mb-5 font-semibold text-gray-900 border-gray-800  hover:bg-gray-600 hover:text-gray-300 dark:border-white dark:text-white dark:hover:bg-gray-200 dark:hover:text-gray-600 cursor-pointer">
          View all blogs &rarr;
        </Button>
      </Link>
    </div>
  );
}
