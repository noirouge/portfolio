"use client";

import { useTheme } from "next-themes";
import {useLangStore, useT} from "@/store/useLangStore";

export default function Navegation() {
      const {setTheme, resolvedTheme} = useTheme();

        const changeTheme = () => setTheme(resolvedTheme === "dark" ? 'light' : 'dark');
        const langStore = useLangStore();
        const t = useT();
        const changeLang = () => langStore.setLocale(langStore.locale === "en" ? 'es' : 'en'); 

  return (
    <>
    <a href="#projects" className="font-light text-stone-800 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400">{t.nav.projects}</a>
                <a href="#skills" className="font-light text-stone-800 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400">{t.nav.skills}</a>
                <a href="#experience" className="font-light text-stone-800 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400">{t.nav.experience}</a>
                <a href="#contact" className="font-light text-stone-800 hover:text-red-700 dark:text-stone-300 dark:hover:text-red-400">{t.nav.contact}</a>
               <button onClick={changeLang} className="flex h-6 w-15 justify-center items-center text-sm gap-x-1 rounded-md bg-stone-900/10 text-stone-800 dark:text-stone-100 hover:bg-red-600/15 hover:text-red-700 dark:bg-white/10 dark:border dark:border-white/20 dark:hover:bg-red-500/20 dark:hover:text-red-300 cursor-pointer transition-all duration-300 uppercase font-mono font-bold">
               <span>
                <svg className="h-4 w-4 text-inherit" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-l</title><path d="M478.33,433.6l-90-218a22,22,0,0,0-40.67,0l-90,218a22,22,0,1,0,40.67,16.79L316.66,406H419.33l18.33,44.39A22,22,0,0,0,458,464a22,22,0,0,0,20.32-30.4ZM334.83,362,368,281.65,401.17,362Z"/><path d="M267.84,342.92a22,22,0,0,0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73,39.65-53.68,62.11-114.75,71.27-143.49H330a22,22,0,0,0,0-44H214V70a22,22,0,0,0-44,0V90H54a22,22,0,0,0,0,44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-31.41-41.68-43.08-68.65-43.17-68.87a22,22,0,0,0-40.58,17c.58,1.38,14.55,34.23,52.86,83.93.92,1.19,1.83,2.35,2.74,3.51-39.24,44.35-77.74,71.86-93.85,80.74a22,22,0,1,0,21.07,38.63c2.16-1.18,48.6-26.89,101.63-85.59,22.52,24.08,38,35.44,38.93,36.1a22,22,0,0,0,30.75-4.9Z"/></svg>
               </span>
               {langStore.locale}
               </button>
                <button className="flex h-6 w-10 justify-center items-center text-sm gap-x-1 rounded-md bg-stone-900/10 text-stone-800 dark:text-stone-100 hover:bg-red-600/15 dark:bg-white/10 dark:border dark:border-white/20 dark:hover:bg-red-500/20 cursor-pointer transition-all duration-300 uppercase font-mono font-bold" onClick={changeTheme}>{resolvedTheme === "dark" ? "☀️" : "🌙"}</button>
    </>
  )
}
