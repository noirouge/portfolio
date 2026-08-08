"use client";
import { useTheme } from "next-themes"
import Background from "./background"

export default function BackgroundTheme() {

    const {resolvedTheme} = useTheme();

  return (
    <Background theme={resolvedTheme === "dark" ? "dark" : "light"} />
  )
}
