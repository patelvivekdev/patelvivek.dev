import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Image from "next/image";
import Me from "@/public/me.jpg";

export const metadata: Metadata = {
  title: "About Me",
  description: "About me.",
  keywords: "about, me, bio, resume",
};

const AboutPage = () => {
  return (
    <div className="h-full mt-40">
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className=" flex flex-col lg:col-span-2 mx-auto p-10 gap-4 w-full">
          <h2 className="text-3xl font-bold">
            I&rsquo;m passionate about{" "}
            <strong className="text-c">web development</strong>, armed with a
            background in Computer Engineering. Currently, I&rsquo;m immersed in
            the world of web development at Conestoga College, where I&rsquo;m
            expanding my skills and crafting captivating web applications.
          </h2>
          <h2 className="text-2xl font-bold">
            Beyond the screen, I&rsquo;m an avid{" "}
            <strong className="text-c">photographer</strong>, capturing
            life&rsquo;s beautiful moments through my lens. I also love
            exploring the great outdoors, seeking inspiration in nature&rsquo;s
            wonders.
          </h2>
          <h2 className="text-2xl font-bold">
            I&rsquo;m a versatile web developer with expertise in a wide range
            of technologies. My skills include building interactive web
            applications using technologies like{" "}
            <strong className="text-c">React</strong>,
            <strong className="text-c">Angular</strong>, and{" "}
            <strong className="text-c">Node.js</strong>. I have experience with
            databases like <strong className="text-c">MongoDB</strong>,{" "}
            <strong className="text-c">MySQL</strong>, and{" "}
            <strong className="text-c">PostgreSQL</strong>, and I&rsquo;m
            proficient in programming languages such as{" "}
            <strong className="text-c">Python</strong>
            and <strong className="text-c">JavaScript</strong>. I&rsquo;m also
            well-versed in version control with{" "}
            <strong className="text-c">Git</strong> and{" "}
            <strong className="text-c">GitHub</strong>. My passion for coding
            drives me to continually explore and master new technologies, making
            me a valuable asset in the world of web development.
          </h2>
        </div>
        <div className="mx-auto p-10 text-center">
          <Image
            className="rounded [box-shadow:15px_-15px_0_-3px_#0284c7,_15px_-15px_#64ffda]"
            src={Me}
            width={300}
            height={300}
            alt="Picture of the author"
            priority={true}
          />
          <Button variant="outline" className="mt-4 hover:bg-teal-500">
            Download CV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
