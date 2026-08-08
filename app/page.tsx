import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans bg-transparent">
      <HeroSection />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
