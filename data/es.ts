import Project from "@/types/Project";

export const projects:Project[] = [
    {
        image: "loan-system-api.svg",
        title: "Sistema de Préstamos API",
        description: "API REST para un negocio real de préstamos informales. No hay cuotas fijas: el interés se cobra cada mes sobre el saldo y, si no se paga, se capitaliza. Maneja clientes, préstamos, pagos y la caja del negocio.",
        descriptionPoints: [
            "Ledger append-only: el saldo se calcula desde asientos inmutables y los errores se corrigen con reversiones",
            "Pagos idempotentes con bloqueo de fila para evitar cobros duplicados",
            "Autenticación JWT con refresh tokens y roles de administrador y empleado",
            "Cargo de interés mensual automático, auditoría y pruebas de integración",
        ],
        mainTechs: ["dotnet", "postgresql"],
        codeUrl: "https://github.com/noirouge/loan-system-api",
    },
    {
        image: "minesweeperjs.png",
        title: "BuscaminasJS",
        description: "El buscaminas clásico reconstruido desde cero. Tablero generado en tiempo de ejecución, cálculo de bombas vecinas y apertura recursiva de las zonas vacías con un solo clic.",
        descriptionPoints: [
            "Tres dificultades + generador de tablero personalizado",
            "Banderas y marcas de duda con clic derecho",
            "Contador de tiempo y de bombas restantes",
            "Interfaz responsive, jugable en móvil"

        ],
        mainTechs: ["html", "css", "javascript"],
        codeUrl: "https://github.com/noirouge/minesweeper-js",
        demoUrl: "https://noirouge.github.io/minesweeper-js/",
    },
    {
        image: "whoistheimposter.png",
        title: "¿Quien es el impostor?",
        description: "Juego de fiesta local para pasar el teléfono entre jugadores. A todos les toca la misma palabra menos al impostor, que recibe una parecida y tiene que disimular hasta que lo descubran",
        descriptionPoints: [
            "Reparto de roles y palabras en secreto, turno por turno",
            "Fase de debate y votación con eliminación por rondas",
            "Jugadores persistentes con foto propia y orden de turnos",
        ],
        mainTechs: ["react-native", "typescript"],
        codeUrl: "https://github.com/noirouge/game-who-is-the-imposter-react-native",
    demoUrl: "https://whoimposter.santanadd.dev/",
    }
]

export const es = {
    nav: {
        projects: "Proyectos",
        skills: "Habilidades",
        experience: "Experiencia",
        contact: "Contacto"
    },
    hero:{
        title: "Desarrollador de Software",
        description: "Desarrollador Full-Stack con experiencia en sistemas ERP empresariales, donde aprendí que un proceso mal entendido cuesta más que un bug. Me involucro en todo el ciclo de desarrollo, desde entender el problema hasta verlo funcionando. Lo que más me motiva es lo que todavía no sé resolver.",
        scroll: "Desplazarse"
    },
    buttons: {
        resume: "Ver Currículo",
        projects: "Ver Proyectos",
        demo: "Ver Demo",
        video: "Ver Video",
        codigo: "Ver Codigo"   
    },
    resume: "/cv/Darlin%20Santana%20Curriculum.pdf",
    projects: projects,
    experience: {
        job: "Ethical Pharmaceutical",
        years: "2022 - 2025",
        position: "Analista Programador",
        description: "Participé en el desarrollo del ERP empresarial, tanto en front como en back, traduciendo los requerimientos del negocio en interfaces funcionales y flujos operativos confiables.",
        descriptionPoints: [
            "Desarrollo y mantenimiento de sistema ERP empresarial.",
            "Implementación de lógica de negocio y servicios backend utilizando C# y ASP.NET (.NET Core).",
            "Diseño e integración de APIs para la comunicación entre módulos y sistemas internos.",
            "Desarrollo de interfaces de usuario utilizando Vue, enfocadas en funcionalidad y experiencia del usuario.",
            "Gestión, consulta y optimización de bases de datos en SQL Server.",
            "Integración de módulos y manejo del flujo de datos entre diferentes componentes del sistema.",
            "Diagnóstico y resolución de incidencias técnicas, brindando soporte a usuarios y aplicaciones en producción.",
            "Mejora continua del rendimiento, estabilidad y escalabilidad del sistema.",
        ]
    },
    skills: {
        all: "Todo"
    },
    contact: "Trabajemos Juntos",

};

export type Dictionary = typeof es;

