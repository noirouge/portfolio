import {create} from "zustand";
import { persist } from "zustand/middleware";
import { es } from "@/data/es";
import {en} from    "@/data/en";


export const dictionaries = {es, en};
export type Locale = keyof typeof dictionaries;


type LangState = {
  locale: Locale,
  setLocale: (locale:Locale) => void;
};


export const useLangStore = create<LangState>()(
    persist(
        (set) => ({
            locale: "en",
            setLocale: (locale) => set({locale: locale})
        }),
        {
            name: "lang-store",
            skipHydration: true,
        }
    ),
);

export const useT = () => useLangStore((s) => dictionaries[s.locale]);