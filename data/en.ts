import Project from "@/types/Project";
import type { Dictionary } from "./es";

export const projects: Project[] = [
    {
        image: "minesweeperjs.png",
        title: "MinesweeperJS",
        description: "The classic Minesweeper rebuilt from scratch. Board generated at runtime, neighboring-bomb calculation and recursive opening of empty areas with a single click.",
        descriptionPoints: [
            "Three difficulty levels + custom board generator",
            "Flags and question marks with right click",
            "Timer and remaining bomb counter",
            "Responsive UI optimized for mobile play",
        ],
        mainTechs: ["html", "css", "javascript"],
        codeUrl: "https://github.com/noirouge/minesweeper-js",
        demoUrl: "https://noirouge.github.io/minesweeper-js/",
    },
    {
    image: "whoistheimposter.png",
    title: "Who Is the Impostor?",
    description: "Local party game where the phone gets passed around. Everyone gets the same word except the impostor, who gets a similar one and has to blend in until they're found out",
    descriptionPoints: [
        "Secret role and word assignment, one turn at a time",
        "Discussion and voting phase with round-based elimination",
        "Persistent players with their own photo and turn order",
    ],
    mainTechs: ["react-native", "typescript"],
    codeUrl: "https://github.com/noirouge/game-who-is-the-imposter-react-native",
     demoUrl: "https://whoimposter.santanadd.dev/",
}
]

export const en = {
    nav: {
        projects: "Projects",
        skills: "Skills",
        experience: "Experience",
        contact: "Contact"
    },
    hero: {
        title: "Software Developer",
        description: "Full-Stack Developer with experience in enterprise ERP systems, where I learned that a misunderstood process costs more than a bug. I get involved in the whole development cycle, from understanding the problem to seeing it up and running. What drives me most is what I don't know how to solve yet.",
        scroll: "Scroll" 
    },
    buttons: {
        resume: "View Resume",
        projects: "View Projects",
        demo: "View Demo",
        video: "Watch Video",
        codigo: "View Code"
    },
    resume: "https://drive.google.com/file/d/1kMV3bBcapKReA01ZQQp59MfPSGAvFeQV/view",
    projects: projects,
    experience: {
        job: "Ethical Pharmaceutical",
        years: "2022 - 2025",
        position: "Programmer Analyst",
        description: "I took part in the development of the company's ERP, on both the front and back end, turning business requirements into functional interfaces and reliable operational workflows.",
        descriptionPoints: [
            "Development and maintenance of an enterprise ERP system.",
            "Implementation of business logic and backend services using C# and ASP.NET (.NET Core).",
            "Design and integration of APIs for communication between modules and internal systems.",
            "Development of user interfaces with Vue, focused on functionality and user experience.",
            "Management, querying and optimization of SQL Server databases.",
            "Module integration and handling of data flow between different system components.",
            "Diagnosis and resolution of technical issues, providing support to users and production applications.",
            "Continuous improvement of system performance, stability and scalability.",
        ]
    },
    contact: "Let's Work Together"
} satisfies Dictionary;