import Image from 'next/image'
import SkillTag from './SkillTag'
import Project from '@/types/Project'

type Props = {
  project: Project;
};

export default function ProjectCard({project}:Props) {
  return (
 <div className="flex flex-col md:flex-row border border-stone-900/15 dark:border-white/12 shadow-2xl shadow-stone-900/10 dark:shadow-black/60 md:h-90 p-2 max-w-150 rounded-2xl bg-white/75 dark:bg-neutral-950/70 transition-all duration-300 hover:glow-red hover:-translate-y-2">
    {/* COLUMN 1 */}
    <div className="flex justify-center items-center md:w-150 ">
    <Image src={`/project-images/${project.image}`} alt={project.title} width={1000} height={1000} className="w-60 h-60 shadow-2xl shadow-stone-900/30 dark:shadow-black rounded-2xl" />
    </div>
    {/* COLUMN 2 */}
    <div className="flex flex-col items-center justify-center w-80 md:w-150 py-5 px-3 gap-y-2">
    <h3 className="font-bold text-1xl text-stone-900 dark:text-stone-50">{project.title}</h3>
    <p className="text-sm text-stone-600 dark:text-stone-300">{project.description}</p>
    <ul className="flex flex-col gap-1 my-2">
      {project.descriptionPoints.map((point, index) => (<li className="text-xs text-stone-600 dark:text-stone-400" key={index} >
        <span className='inline-block w-2 h-2 bg-linear-to-br from-red-500 to-red-700 dark:from-red-400 dark:to-red-600 rounded-full me-2'> </span>
        {point}
        </li>))}
      
    </ul>
    <div className="flex gap-2 justify-start text-xs">
      {project.mainTechs.map(tech => (
      <SkillTag tag={tech} key={tech} />
      ))}
    </div>
    <div className="flex flex-wrap justify-start w-full gap-2">
      {project.demoUrl && (<a href={project.demoUrl} target='_blank' className="btn-danger px-2 h-7 font-bold">Ver Demo</a>)}
      {project.videoUrl && (<a href={project.videoUrl} target='_blank' className="btn-danger px-2 h-7 font-bold">Ver Video</a>)}
      <a href={project.codeUrl} target='_blank' className="btn-empty px-3 h-7  font-bold">Ver Codigo</a>
    </div>
    </div>
            </div>
  )
}
