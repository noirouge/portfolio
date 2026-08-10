"use client";
import { useT } from "@/store/useLangStore";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
    const t = useT();
  return (
    <section id="experience" className="flex flex-col justify-center items-center py-20 text-center max-w-7xl">
       <h1 className="font-bold text-5xl my-5 text-stone-900 dark:text-white">{t.nav.experience}</h1>
       <div className="flex justify-center flex-wrap gap-5 max-w-6xl">
    <ExperienceCard />
       </div>
        </section>
  )
}
