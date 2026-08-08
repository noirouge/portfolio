"use client";
import { useT } from "@/store/useLangStore";
import SkillTag from "./SkillTag";
import { skills as skillsData } from "@/data";


export default function Skills() {
    const t = useT();
  return (
   <section id="skills" className="flex flex-col justify-center items-center text-center py-20">
        <h1 className="font-bold text-5xl text-stone-900 dark:text-white" >{t.nav.skills}</h1>
        <div  className="my-5 px-5">
            {skillsData.map(skill => (

<div className="flex flex-col sm:flex-row justify-start max-w-6xl gap-5 my-10" key={skill.section}>
    <h2 className="font-bold flex justify-start text-3xl text-stone-800 dark:text-stone-200">{skill.section}</h2>
    <div className="flex justify-start flex-wrap gap-2 px-2">
        {skill.tags.map(tag => (
        <SkillTag tag={tag} key={tag} />
        ))}

    </div>
</div>
            ))}
        </div>
    </section>
  )
}
