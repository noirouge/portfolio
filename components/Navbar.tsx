"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navegation from "./Navegation";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);


  const handleMenu = () => {
    if(menuOpened) setMenuOpened(false);
    else setMenuOpened(true);
  }


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  },[])


  return (
    <nav className={`fixed top-0 w-full z-40 transition-colors duration-300 
    ${scrolled || menuOpened ? 'bg-orange-50/70 dark:bg-black/80 backdrop-blur border-b border-stone-900/15 dark:border-white/15' : 'border-b border-transparent'}
    `}>
     <div className=" max-w-6xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">

<div className="flex gap-x-2 cursor-pointer">
<a href="#top" className="text-2xl font-bold bg-linear-to-r from-stone-900 via-stone-600 to-stone-900 dark:from-white dark:via-stone-300 dark:to-stone-400 bg-clip-text text-transparent">Santana </a>
<a href="#top" className="text-2xl font-bold bg-linear-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent"> D. </a>
<a href="#top" className="text-2xl font-bold bg-linear-to-r from-stone-900 via-stone-600 to-stone-900 dark:from-white dark:via-stone-300 dark:to-stone-400 bg-clip-text text-transparent">Darlin</a>
</div>

        {/* NAVEGATION AND TOOLS */}
  <div className="hidden md:flex gap-x-2">
            <Navegation />
      </div>
      <div className="flex md:hidden">
      <Image onClick={handleMenu} src={`${menuOpened?'/icons/close.svg':'/icons/menu.svg'}`} alt="menu" width={100} height={100} className="h-10 cursor-pointer invert dark:invert-0" />
      </div>

      </div>
     </div>
     {/* Menu Options and Tools in Mobile Screen */}
     <div className={`flex flex-col md:hidden  transition-all gap-y-2 overflow-hidden duration-300  mx-5   ${menuOpened?'max-h-72 py-5 border-t border-stone-900/15 dark:border-white/15':'max-h-0 border-t-transparent'}`}>

       <Navegation />
     </div>
    </nav>
  );
}
