"use client";

import Tag from "@/types/Tag";
import SkillIcon from "./Icon";



type Props = {
    tag: Tag;

}

export default function SkillTag({tag}:Props) {


    const tagName = ():string => {

        switch(tag){
          case "react": 
          return "React";
          case "angular":
            return "Angular";
          case "vue":
            return "VUE";
          case "bootstrap":
            return "Bootstrap";
          case "css":
            return "CSS";
          case "docker":
            return "Docker";
          case "dotnet":
            return ".NET";
          case "git":
            return "GIT";
          case "github":
            return "Github";
          case "html":
            return "HTML";
          case "javascript":
            return "Javascript";
          case "nextjs":
            return "NextJS";
          case "node":
            return "NodeJS";
          case "tailwind":
            return "Tailwind";
          case "typescript":
            return "Typescript";
            case "react-native":
          return "React Native";
default: return "Default";
        }
    }

  



 return (
 <div className="flex h-7 border border-stone-900/15 dark:border-white/25 p-4 bg-white/75 dark:bg-stone-100/90 text-stone-800 dark:text-stone-900 justify-center items-center rounded-2xl gap-x-2">
<SkillIcon tag={tag} width={18} height={18} />
<p className="font-bold">
    {tagName()}
    </p>
</div>
);
}
