"use client";
import Image from "next/image"
import SkillIcon from "./Icon"
import { useT } from "@/store/useLangStore";

export default function ExperienceCard() {
    const t = useT();
  return (
    <div className=" md:flex border overflow-hidden border-stone-900/15 dark:border-white/12 w-80 md:w-2/4 lg:w-4/5  xl:w-full rounded-2xl bg-white/75 dark:bg-neutral-950/65 transition-all duration-300 hover:glow-red hover:border-red-600 dark:hover:border-red-500 hover:-translate-y-2  ">
        <div className="relative h-44 md:h-full sm:max-w-80">
            <Image src="/experience-images/ethical.jpg" alt="Ethical" width={1000} height={1000} className="w-full h-full "/>
        </div>
        <div className="flex flex-col items-start justify-between ps-5 py-2 px-5">
        <h2 className="font-mono pt-2 w-full font-bold rounded-t-2xl flex justify-start text-start text-2xl md:text-4xl text-stone-900 dark:text-stone-50">
          {t.experience.job}
          </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm">{t.experience.years}</p>
            <h3 className="font-bold text-red-700 dark:text-red-400">
            {t.experience.position}
            </h3>
            <p className="text-start text-sm text-stone-700 dark:text-stone-300">
              {t.experience.description}
              </p>
          <ul className="flex flex-col justify-start items-start text-start text-sm text-stone-600 dark:text-stone-400 my-2">

            {t.experience.descriptionPoints.map((point, index) =>
            (<li className="flex justify-start items-start" key={index}>• {point}
</li>)
            )}
          </ul>
            <div className="flex flex-col justify-start items-start w-full border-t py-5 border-stone-900/15 dark:border-white/12">
                <div className="flex gap-2">
        <SkillIcon tag="vue" width={30} height={30} />
         <SkillIcon tag="dotnet" width={30} height={30} />
         <SkillIcon tag="tailwind" width={30} height={30} />
           <SkillIcon tag="typescript" width={30} height={30} />
            <SkillIcon tag="sqlserver" width={30} height={30} />


                </div>
            </div>
        </div>
        </div>
  )
}
