"use client";
import { useEffect } from "react";
import { useLangStore } from "@/store/useLangStore";

export function LocaleInit() {
  useEffect(() => {
    useLangStore.persist.rehydrate();
    if (!localStorage.getItem("lang-store")) {
      const nav = navigator.language.toLowerCase();
      useLangStore.getState().setLocale(nav.startsWith("en") ? "en" : "es");
    }
  }, []);

  return null;
}