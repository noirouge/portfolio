"use client";


import ProjectCard from "./ProjectCard";
import { useT } from "@/store/useLangStore";

export default function Projects() {

  const t = useT();

  return (
   <section id="projects" className="flex flex-col justify-center items-center w-full py-20 px-5">
      <h1 className="font-bold text-5xl text-stone-900 dark:text-white mb-10">
      {t.nav.projects}
      </h1>
      <div className="flex flex-col gap-10 w-full max-w-5xl">
       {
        t.projects.map((project, index) => (<ProjectCard key={project.title} project={project} index={index} />))
       }
      </div>
      </section>
  )
}
