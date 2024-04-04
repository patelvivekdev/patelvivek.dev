import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";


export const metadata: Metadata = {
  title: "All Projects",
  description: "All projects I have worked on.",
  keywords: "projects, work, portfolio",
};

const ProjectPage = () => {
  const projects = [
    {
      slug: "market-hub",
      title: "Market-hub",
      description: "Market-hub is a MERN-powered platform for buying and selling computer items. Vendors can easily manage their products, while users enjoy a smooth shopping experience. It's a user-friendly solution for tech enthusiasts and sellers alike.",
      image: {
        src: "https://firebasestorage.googleapis.com/v0/b/vivek-0206.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769",
        alt: "Market-hub logo",
      },
      link: "projects/market-hub",
      tags: ["MERN", "React", "Nodejs", "Express", "MongoDB", "FullStack"]
    },
    {
      slug: "acme-auth",
      title: "Acme Auth",
      description: "Acme Auth is a learning project focused on integrating third-party authentication APIs. It covers registration, login, logout, password recovery, and email verification. With a responsive design and efficient routing, it showcases modern web development practices using Next.js server actions and Tailwind CSS.",
      image: {
        src: "https://firebasestorage.googleapis.com/v0/b/vivek-0206.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769",
        alt: "Acme Auth logo",
      },
      link: "projects/acme-auth",
      tags: ["Nextjs", "React", "AppRouter", "ShadcnUI", "TailwindCSS", "Authentication", "FreeAPI", "RESTAPI", "ServerActions", "TypeScript"]
    },
  ];


  return (
    <div className="mx-auto w-5/6 flex flex-col items-center mt-40">
      <h1 className="text-4xl">Projects</h1>
      <p className="text-lg mt-4 mb-8">
        Here are some of the projects I have worked on.
      </p>
      <div className="grid grid-cols-1 gap-4 p-5 sm:p-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            link={project.link}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
