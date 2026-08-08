"use client";


import { projects } from "@/data";
import ProjectCard from "./ProjectCard";
import { useT } from "@/store/useLangStore";

export default function Projects() {

  const t = useT();

  return (
   <section id="projects" className=" max-w-7xl flex flex-col justify-center py-20 items-center w-screen">
      <h1 className="font-bold text-5xl text-stone-900 dark:text-white mb-5">
      {t.nav.projects}
      </h1>
      <div className="flex  gap-5 flex-wrap items-center justify-center w-full">
       {
        t.projects.map(project => (<ProjectCard key={project.title} project={project} />))
       }
       
      </div>
      </section>
  )
}
