"use client";

import Image from 'next/image'
import SkillTag from './SkillTag'
import Project from '@/types/Project'
import { useT } from '@/store/useLangStore';

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({project,index}:Props) {

  const t = useT();

  return (
 <article className={`group flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} w-full overflow-hidden rounded-3xl border border-stone-900/15 dark:border-white/12 bg-white/75 dark:bg-neutral-950/70 shadow-2xl shadow-stone-900/10 dark:shadow-black/60 transition-all duration-300 hover:glow-red hover:border-red-600 dark:hover:border-red-500`}>
    {/* IMAGE */}
    <div className="relative h-64 sm:h-80 md:h-auto md:min-h-104 md:w-2/5 shrink-0 overflow-hidden bg-stone-900/5 dark:bg-white/5">
      <Image src={`/project-images/${project.image}`} alt={project.title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 rounded-md bg-black/60 px-2 py-1 font-mono text-xs font-bold tracking-[0.3em] text-white backdrop-blur">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    {/* CONTENT */}
    <div className="flex flex-col gap-y-4 p-6 sm:p-8 md:w-3/5 text-start">
      <h3 className="font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-50">{project.title}</h3>
      <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">{project.description}</p>

      <ul className="flex flex-col gap-y-2">
        {project.descriptionPoints.map((point, index) => (
        <li className="flex items-start text-sm text-stone-600 dark:text-stone-400" key={index}>
          <span className="inline-block shrink-0 w-2 h-2 mt-1.5 me-3 rounded-full bg-linear-to-br from-red-500 to-red-700 dark:from-red-400 dark:to-red-600" />
          {point}
        </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 text-xs">
        {project.mainTechs.map(tech => (
        <SkillTag tag={tech} key={tech} />
        ))}
      </div>

      {/* LINKS */}
      <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-stone-900/15 dark:border-white/12">
        {project.demoUrl && (
        <a href={project.demoUrl} target='_blank' className="btn-danger h-10 px-4 gap-x-2 font-bold">
          {t.buttons.demo}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>
        </a>
        )}
        {project.videoUrl && (
        <a href={project.videoUrl} target='_blank' className="btn-danger h-10 px-4 gap-x-2 font-bold">
          {t.buttons.video}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </a>
        )}
        <a href={project.codeUrl} target='_blank' className="btn-empty h-10 px-4 gap-x-2 font-bold">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>
          {t.buttons.codigo}
        </a>
      </div>
    </div>
 </article>
  )
}
