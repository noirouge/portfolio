import Tag from "@/types/Tag";
import SkillIcon from "./Icon";
import { tagNames } from "@/data";

type Props = {
    tag: Tag;
    index: number;
    dimmed: boolean;
}

export default function SkillCard({tag,index,dimmed}:Props) {
  return (
    <div className="animate-float" style={{animationDelay: `${index * 150}ms`, animationDuration: `${5 + (index % 3)}s`}}>
        <div className={`flex flex-col h-26 sm:h-32 items-center justify-center gap-y-2 rounded-2xl border border-stone-900/15 dark:border-white/12 bg-white/75 dark:bg-neutral-950/70 shadow-2xl shadow-stone-900/10 dark:shadow-black/60 transition-all duration-500
        ${dimmed ? 'opacity-20 grayscale scale-90 pointer-events-none' : 'hover:glow-red hover:border-red-600 dark:hover:border-red-500 hover:-translate-y-2'}
        `}>
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 justify-center items-center rounded-xl border border-stone-900/10 bg-white/90 dark:bg-stone-100/90">
                <SkillIcon tag={tag} width={26} height={26} />
            </div>
            <p className="font-bold text-[11px] sm:text-xs text-stone-700 dark:text-stone-300">{tagNames[tag]}</p>
        </div>
    </div>
  )
}
