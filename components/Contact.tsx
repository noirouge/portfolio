"use client";

import { useT } from "@/store/useLangStore";
import Icon from "./Icon";


export default function Contact() {

    const t = useT();

  return (
    <section id="contact" className="flex flex-col justify-center items-center py-20">
        <h1 className="font-bold text-5xl my-5 text-stone-900 dark:text-white">{t.nav.contact}</h1>
        <p className="text-base text-stone-600 dark:text-stone-600 mb-10">{t.contact}</p>

        <div className=" p-5 md:w-3xl xl:w-6xl border border-stone-900/15 dark:border-white/12 min-h-50 bg-white/70 dark:bg-neutral-950/65 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:translate-y-2 hover:glow-red">
<h2 className="text-2xl sm:text-4xl font-bold mb-5 text-stone-900 dark:text-stone-50">darlin10xz@gmail.com</h2>
<div className="flex flex-col sm:flex-row flex-wrap gap-5">
    <a href={t.resume} target="_blank" className="btn-danger font-bold px-2 w-44 h-13">{t.buttons.resume}</a>
    <a href="https://www.linkedin.com/in/santanadarlin/" target="_blank"  className="btn-empty font-bold px-2 w-44 h-13 gap-x-2">
    <Icon tag="linkedin" width={18} height={18} />
    LinkedIn
    </a>
    <a href="https://github.com/noirouge" target="_blank"  className="btn-empty font-bold px-2 w-44 h-13 gap-x-2">
        <Icon tag="github" width={18} height={18} />
    GitHub</a>
</div>
        </div>
        </section>
  )
}
