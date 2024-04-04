import BlogPost from "@/components/BlogPost";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.5] bg-dot-black/[0.8] relative flex flex-col gap-3 sm:gap-5 items-center">
      <div className="absolute pointer-events-none inset-0 flex items-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
      <Hero />
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center text-black dark:text-white">
        Latest Project
        <hr />
      </h3>
      <div className="w-4/5 grid grid-cols-1 gap-4 p-5 sm:p-10">
        <ProjectCard
          title="First project"
          description="This is the first project"
          link="projects/first-project"
          tags={["tag1", "tag2", "tag3"]}
        />
        <ProjectCard
          title="Second project"
          description="This is the Second project"
          link="projects/second-project"
          tags={["tag1", "tag2", "tag3"]}
        />
        <ProjectCard
          title="First project"
          description="This is the first project"
          link="projects/third-project"
          tags={["tag1", "tag2", "tag3"]}
        />
      </div>
      {/* Most viewed Blogs */}
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight text-center text-black dark:text-white">
        Recent Blog
        <hr />
      </h3>
      <div className="w-4/5 grid grid-cols-1 gap-4 p-5 sm:p-10">
        <BlogPost
          title="First blog"
          summary="This is the first blog"
          slug="first-blog"
        />
        <BlogPost
          title="Second blog"
          summary="This is the Second blog"
          slug="second-blog"
        />
        <BlogPost
          title="Third blog"
          summary="This is the Third blog"
          slug="third-blog"
        />
      </div>
    </div>
  );
}
