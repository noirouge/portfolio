import Project from "@/types/Project";
import Skill from "@/types/Skill";

export const skills:Skill[] = [
    {
        section: 'Frontend',
        tags: ['typescript', 'javascript', 'react', 'vue', 'angular', 'tailwind', 'bootstrap', 'nextjs']
    },
    {
        section: 'Backend',
        tags: ['dotnet', 'node' ]
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