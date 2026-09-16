import Project from "@/types/Project";
import Skill from "@/types/Skill";
import Tag from "@/types/Tag";

export const tagNames:Record<Tag, string> = {
    'react': 'React',
    'react-native': 'React Native',
    'angular': 'Angular',
    'vue': 'VUE',
    'bootstrap': 'Bootstrap',
    'claude': 'Claude',
    'codex': 'Codex',
    'copilot': 'GitHub Copilot',
    'css': 'CSS',
    'docker': 'Docker',
    'dotnet': '.NET',
    'express': 'Express',
    'firebase': 'Firebase',
    'git': 'GIT',
    'github': 'Github',
    'html': 'HTML',
    'javascript': 'Javascript',
    'mongodb': 'MongoDB',
    'nextjs': 'NextJS',
    'node': 'NodeJS',
    'postgresql': 'PostgreSQL',
    'sqlserver': 'SQL Server',
    'tailwind': 'Tailwind',
    'typescript': 'Typescript',
    'linkedin': 'LinkedIn',
};

export const skills:Skill[] = [
    {
        section: 'frontend',
        tags: ['typescript', 'javascript', 'react', 'vue', 'angular', 'tailwind', 'bootstrap', 'nextjs']
    },
    {
        section: 'backend',
        tags: ['dotnet', 'node', 'express', 'mongodb', 'sqlserver', 'postgresql', 'firebase' ]
    },
    {
        section: 'ai',
        tags: ['claude', 'codex', 'copilot']
    },
    // {
    //     section: 'Tools',
    //     tags: ['docker', 'git', 'github', ]
    // }
];

export const projects:Project[] = [
    {
        image: "minesweeperjs.png",
        title: "MinesweeperJS",
        description: "El buscaminas clásico reconstruido desde cero. Tablero generado en tiempo de ejecución, cálculo de bombas vecinas y apertura recursiva de las zonas vacías con un solo clic.",
        descriptionPoints: [
            "Tres dificultades + generador de tablero personalizado",
            "Banderas y marcas de duda con clic derecho",
            "Contador de tiempo y de bombas restantes",
          
        ],
        mainTechs: ["html", "css", "javascript"],
        codeUrl: "https://github.com/noirouge/minesweeper-js",
        demoUrl: "https://noirouge.github.io/minesweeper-js/",
    },



]