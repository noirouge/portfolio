"use client";
import { useState } from "react";
import { useT } from "@/store/useLangStore";
import SkillCard from "./SkillCard";
import { skills as skillsData } from "@/data";


export default function Skills() {

    const t = useT();
    const [filter, setFilter] = useState("all");

    const sections = skillsData.map(skill => skill.section);
    const tags = skillsData.flatMap(skill => skill.tags.map(tag => ({tag: tag, section: skill.section})));

    const moveSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - box.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - box.top}px`);
    }

  return (
   <section id="skills" className="flex flex-col justify-center items-center text-center w-full py-20 px-5">
        <h1 className="font-bold text-5xl text-stone-900 dark:text-white" >{t.nav.skills}</h1>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 my-8">
            <button onClick={() => setFilter("all")} className={`${filter === "all" ? 'btn-danger' : 'btn-empty'} h-8 px-4 font-mono text-xs font-bold uppercase tracking-widest`}>{t.skills.all}</button>
            {sections.map(section => (
            <button key={section} onClick={() => setFilter(section)} className={`${filter === section ? 'btn-danger' : 'btn-empty'} h-8 px-4 font-mono text-xs font-bold uppercase tracking-widest`}>{t.skills[section]}</button>
            ))}
        </div>

        {/* GRID + SPOTLIGHT */}
        <div onMouseMove={moveSpotlight} className="group relative w-full max-w-4xl overflow-hidden rounded-3xl border border-stone-900/15 dark:border-white/12 bg-white/40 dark:bg-neutral-950/40 p-5 sm:p-8">
            <div className="spotlight-red pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {tags.map((skill, index) => (
                <SkillCard tag={skill.tag} index={index} dimmed={filter !== "all" && filter !== skill.section} key={skill.tag} />
                ))}
            </div>
        </div>
    </section>
  )
}
