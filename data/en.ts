import Project from "@/types/Project";
import type { Dictionary } from "./es";

export const projects: Project[] = [
    {
        image: "loan-system-api.svg",
        title: "Loan System API",
        description: "REST API for a real informal lending business. There are no fixed installments: interest is charged monthly on the balance and, if it goes unpaid, it compounds. Handles customers, loans, payments and the business cash box.",
        descriptionPoints: [
            "Append-only ledger: balances are computed from immutable entries and mistakes are fixed with reversals",
            "Idempotent payments with row locking to prevent duplicate charges",
            "JWT authentication with refresh tokens and admin and worker roles",
            "Automatic monthly interest charges, audit log and integration tests",
        ],
        mainTechs: ["dotnet", "postgresql"],
        codeUrl: "https://github.com/noirouge/loan-system-api",
    },
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
        description: "Full-Stack Developer specialized in .NET and React, with three years of experience building enterprise ERP systems. I design APIs, model complex business logic and build operations-focused interfaces, taking part in the entire software lifecycle, from requirements analysis to production support.",
        scroll: "Scroll" 
    },
    buttons: {
        resume: "View Resume",
        projects: "View Projects",
        demo: "View Demo",
        video: "Watch Video",
        codigo: "View Code"
    },
    resume: "/cv/Darlin%20Santana%20Curriculum%20EN.pdf",
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
    skills: {
        all: "All",
        frontend: "Frontend",
        backend: "Backend",
        ai: "AI Tools"
    },
    contact: "Let's Work Together"
} satisfies Dictionary;