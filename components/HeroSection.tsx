"use client";

import Icon from "./Icon";
import { useT } from "@/store/useLangStore";



export default function HeroSection() {

  const t = useT();


  return (
    <section className='min-h-screen flex flex-col justify-center items-center mt-10 px-5'>
      <div className='max-w-5xl flex flex-col justify-center items-center gap-y-5'>
        <h1 className='font-bold text-center text-5xl sm:text-6xl md:text-7xl bg-linear-to-b from-red-500 via-red-700 to-red-500 dark:from-red-400 dark:via-red-500 dark:to-red-400 bg-clip-text text-transparent '>{t.hero.title}</h1>
        <p className="font-medium text-center text-stone-700 dark:text-stone-300">{t.hero.description}</p>
      <div className='flex flex-wrap gap-2 sm:gap-5 justify-center items-center' >
        <a href="https://drive.google.com/file/d/1kMV3bBcapKReA01ZQQp59MfPSGAvFeQV/view?usp=sharing" target="_blank" className="btn-danger px-2 w-30 sm:w-44 h-10 sm:h-13 text-sm sm:text-base font-bold">{t.buttons.resume}</a>
        <a href="#projects"  className="btn-empty px-2  w-30 sm:w-44 h-10 sm:h-13 text-sm sm:text-base font-bold">{t.buttons.projects}</a>
        <a href="#contact"  className="btn-empty px-2 w-30 sm:w-44 h-10 sm:h-13 text-sm sm:text-base font-bold">{t.nav.contact}</a>
      </div>
      <div className="flex gap-x-5 justify-center items-center sm:h-20">
            <a href="https://github.com/noirouge" target="_blank"  className="rounded-full flex justify-center items-center p-3 bg-white/60 dark:bg-white/10  font-bold   cursor-pointer border border-stone-900/20 dark:border-white/25  transition-all duration-300 hover:shadow hover:shadow-red-500/40 dark:hover:shadow-red-400/50 hover:border-red-500 dark:hover:border-red-400 hover:mb-3">
                <Icon tag="github" width={20} height={20} />
            </a>
         <a href="https://www.linkedin.com/in/santanadarlin/" target="_blank"  className="rounded-full flex justify-center items-center p-3 bg-white/60 dark:bg-white/10  font-bold   cursor-pointer border border-stone-900/20 dark:border-white/25  transition-all duration-300 hover:shadow hover:shadow-red-500/40 dark:hover:shadow-red-400/50 hover:border-red-500 dark:hover:border-red-400 hover:mb-3">
            <Icon tag="linkedin" width={20} height={20} />
            </a>
      </div>
      </div>
      <a href="#projects" className="absolute text-stone-700 dark:text-stone-400 bottom-2 sm:bottom-10 flex flex-col items-center justify-center cursor-pointer hover:text-red-700 dark:hover:text-red-400 ">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
        <span className="inline-block h-8 sm:h-10 w-px bg-linear-to-b from-red-600  via-red-500 to-transparent dark:from-red-500 dark:via-red-400"></span>
      </a>
    </section>
  )
}
