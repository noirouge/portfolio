"use client";

import Tag from "@/types/Tag";
import SkillIcon from "./Icon";
import { tagNames } from "@/data";



type Props = {
    tag: Tag;

}

export default function SkillTag({tag}:Props) {


 return (
 <div className="flex h-7 border border-stone-900/15 dark:border-white/25 p-4 bg-white/75 dark:bg-stone-100/90 text-stone-800 dark:text-stone-900 justify-center items-center rounded-2xl gap-x-2">
<SkillIcon tag={tag} width={18} height={18} />
<p className="font-bold">
    {tagNames[tag]}
    </p>
</div>
);
}
