"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* ============================================================================
 * Background.tsx — Fondo animado de espirales que "respiran". Dos temas.
 *
 * · Cero dependencias (React + canvas 2D). Copiar/pegar en cualquier proyecto.
 * · Funciona en Next.js (App Router) gracias al "use client" de arriba.
 * · Respeta `prefers-reduced-motion` (dibuja un único frame estático).
 * · Se pausa solo cuando la pestaña no está visible.
 *
 * Los dos temas son el mismo objeto astronómico visto desde los dos lados:
 *
 *   theme="dark"  → AGUJERO NEGRO. Luz aditiva sobre el vacío: los brazos son
 *                   neón, el centro está apagado y la materia cae hacia dentro.
 *   theme="light" → AGUJERO BLANCO / SOL. Se invierte el modelo de render: el
 *                   cielo es cálido, el núcleo está reventado de blanco, los
 *                   brazos son TINTA (multiply) en ámbar y ascua, y los pulsos
 *                   de energía queman la tinta hacia luz mientras salen. Un
 *                   abanico de rayos solares gira en contrafase a las espirales.
 *
 * Uso A — capa fija detrás de toda la app (layout global):
 *   <Background theme="light" />   // position: fixed; inset: 0; z-index: -1
 *   ...tu app...
 *   Requisito: ningún ancestro con fondo opaco, ni con `transform`/`filter`/
 *   `backdrop-filter`/`perspective`/`contain` (eso rompe `position: fixed`).
 *
 * Uso B — dentro de una sección / hero / card:
 *   <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
 *     <Background mode="absolute" />
 *     <div style={{ position: "relative", zIndex: 1 }}>Tu contenido</div>
 *   </section>
 *   El padre DEBE tener `position: relative` y altura propia.
 *
 * Uso C — que el propio fondo envuelva al contenido (a prueba de balas):
 *   <Background theme="system" style={{ minHeight: "100vh" }}>
 *     <h1>Tu contenido</h1>
 *   </Background>
 *
 * ¿No se ve nada? Casi siempre es una de estas tres:
 *   1. El contenedor mide 0 de alto → dale altura (o usa el Uso A / C).
 *   2. Un ancestro con fondo opaco tapa la capa `z-index: -1` → usa `mode="absolute"`
 *      o pásale `zIndex={0}` y pon tu contenido en `position: relative; z-index: 1`.
 *   3. Un ancestro con `transform` (animaciones, `translate-*`) anula el `fixed`.
 * ========================================================================== */

type RGB = [number, number, number];

/** Los dos temas visuales. `"system"` sigue a `prefers-color-scheme`. */
export type BackgroundTheme = "dark" | "light";

export interface BackgroundColors {
  /** Color sólido del lienzo (y del cielo, en light). */
  background?: string;
  /** Tono profundo: brazos secundarios y filamentos. */
  deep?: string;
  /** Tono principal: brazos protagonistas. */
  glow?: string;
  /** Núcleo caliente: pulsos de energía que viajan por la espiral. */
  core?: string;
}

export interface BackgroundProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * Tema del fondo:
   * · "dark"   → agujero negro (por defecto).
   * · "light"  → agujero blanco: sol y espirales.
   * · "system" → sigue a `prefers-color-scheme` y reacciona a los cambios.
   */
  theme?: BackgroundTheme | "system";
  /** Opacidad global del campo de espirales. 0–1. Bájalo si tapa el contenido. */
  intensity?: number;
  /** Segundos por ciclo de respiración (inhalar → sostener → exhalar → pausa). */
  breathDuration?: number;
  /** Multiplicador de la velocidad de rotación. */
  speed?: number;
  /** Número de brazos de la espiral principal. */
  arms?: number;
  /** Vueltas que da cada brazo desde el centro al borde. */
  turns?: number;
  /** Sobrescribe la paleta del tema activo (mezcla parcial: pasa solo lo que quieras). */
  colors?: BackgroundColors;
  /** Parallax sutil siguiendo el puntero. */
  interactive?: boolean;
  /** Grano de película por encima del canvas. */
  grain?: boolean;
  /** Viñeta: modela la luz para que el contenido se lea sobre el fondo. */
  vignette?: boolean;
  /**
   * Cómo se posiciona el fondo:
   * · "fixed"     → capa fija a pantalla completa detrás de la app (por defecto sin children).
   * · "absolute"  → rellena el ancestro posicionado más cercano (secciones, hero, cards).
   * · "container" → wrapper propio que envuelve a `children` (por defecto con children).
   * Si no lo indicas: "container" cuando hay children, "fixed" cuando no.
   */
  mode?: "fixed" | "absolute" | "container";
  /** @deprecated Usa `mode`. `fixed={false}` equivale a `mode="absolute"`. */
  fixed?: boolean;
  zIndex?: number;
}

/** Paletas por tema. `colors` se mezcla encima de la que corresponda. */
export const BACKGROUND_PALETTES: Record<BackgroundTheme, Required<BackgroundColors>> = {
  // Agujero negro: rojo neón sobre vacío.
  dark: {
    background: "#050406",
    deep: "#7e0b1b",
    glow: "#ff1f3d",
    core: "#ff8a72",
  },
  // Agujero blanco: tinta de ascua y ámbar sobre papel cálido, núcleo blanco-oro.
  light: {
    background: "#fdf6ea",
    deep: "#e2621c",
    glow: "#f0a01e",
    core: "#fff6d2",
  },
};

/* -------------------------------------------------------------------------- */
/* Utilidades                                                                  */
/* -------------------------------------------------------------------------- */

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

const mixRgb = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const WHITE: RGB = [255, 255, 255];

/**
 * Curva de respiración: inhalar (40%) → sostener (10%) → exhalar (42%) → pausa.
 * Asimétrica a propósito: la exhalación es más larga, como una respiración real.
 */
function breathCurve(p: number): number {
  if (p < 0.4) return smoothstep(p / 0.4);
  if (p < 0.5) return 1;
  if (p < 0.92) return 1 - smoothstep((p - 0.5) / 0.42);
  return 0;
}

/**
 * Sprite radial pre-renderizado. Dibujar una imagen es órdenes de magnitud más
 * barato que usar `shadowBlur` por partícula.
 *
 * `toward = 1` → el centro se lava hacia blanco: eso es lo que produce el neón
 * del tema oscuro, que se dibuja en modo aditivo.
 * `toward = -1` → el centro se satura hacia su propia sombra: es un sprite de
 * TINTA, pensado para dibujarse en `multiply` sobre el cielo claro.
 */
function createSprite(rgb: RGB, hotness: number, toward: 1 | -1 = 1): HTMLCanvasElement {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d")!;
  const mid = size / 2;

  const hot: RGB =
    toward === 1
      ? mixRgb(rgb, WHITE, hotness)
      : // La tinta no se va a negro puro: se hunde hacia su propio tono quemado,
        // porque un ascua apagada sigue siendo naranja, no gris.
        mixRgb(rgb, [Math.round(rgb[0] * 0.35), Math.round(rgb[1] * 0.16), Math.round(rgb[2] * 0.3)], hotness);

  const grad = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
  if (toward === 1) {
    grad.addColorStop(0.0, css(hot, 1));
    grad.addColorStop(0.08, css(rgb, 0.85));
    grad.addColorStop(0.22, css(rgb, 0.32));
    grad.addColorStop(0.5, css(rgb, 0.08));
    grad.addColorStop(1.0, css(rgb, 0));
  } else {
    // La tinta necesita una caída más corta que el neón: el aditivo se lee
    // aunque sea difuso, pero un `multiply` muy abierto solo ensucia el papel
    // sin dibujar nada. Núcleo denso, borde que muere pronto.
    grad.addColorStop(0.0, css(hot, 0.95));
    grad.addColorStop(0.1, css(rgb, 0.75));
    grad.addColorStop(0.3, css(rgb, 0.34));
    grad.addColorStop(0.6, css(rgb, 0.09));
    grad.addColorStop(1.0, css(rgb, 0));
  }

  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

/** Lee el tema del sistema y se resuscribe a los cambios. Solo si `theme="system"`. */
function useResolvedTheme(theme: BackgroundProps["theme"]): BackgroundTheme {
  const [systemTheme, setSystemTheme] = useState<BackgroundTheme>("dark");

  useEffect(() => {
    if (theme !== "system" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemTheme(mq.matches ? "dark" : "light");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [theme]);

  return theme === "system" ? systemTheme : theme ?? "dark";
}

/* -------------------------------------------------------------------------- */
/* Componente                                                                  */
/* -------------------------------------------------------------------------- */

export function Background({
  className,
  style,
  children,
  theme = "dark",
  intensity = 1,
  breathDuration = 9,
  speed = 1,
  arms = 3,
  turns = 3.4,
  colors,
  interactive = true,
  grain = true,
  vignette = true,
  mode,
  fixed,
  zIndex,
}: BackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Los parámetros vivos van por ref: así el bucle de animación nunca se reinicia.
  const paramsRef = useRef({ intensity, breathDuration, speed, arms, turns, interactive });
  // eslint-disable-next-line react-hooks/refs
  paramsRef.current = { intensity, breathDuration, speed, arms, turns, interactive };

  const resolvedTheme = useResolvedTheme(theme);
  const isLight = resolvedTheme === "light";

  const palette = { ...BACKGROUND_PALETTES[resolvedTheme], ...colors };
  const { background, deep, glow, core } = palette;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const rgbBg = hexToRgb(background);
    const rgbDeep = hexToRgb(deep);
    const rgbGlow = hexToRgb(glow);
    const rgbCore = hexToRgb(core);

    // En light los brazos son tinta (multiply) y solo el núcleo emite luz.
    const ink: 1 | -1 = isLight ? -1 : 1;
    const spriteGlow = createSprite(rgbGlow, 0.55, ink);
    const spriteDeep = createSprite(rgbDeep, isLight ? 0.45 : 0.25, ink);
    const spriteCore = createSprite(rgbCore, 0.8, 1);

    // Cielo del agujero blanco: del blanco reventado del núcleo al papel cálido,
    // cerrando en un borde tostado que hace de horizonte.
    const rgbSkyEdge = mixRgb(rgbBg, [188, 122, 58], 0.34);
    const rgbSkyMid = mixRgb(rgbBg, WHITE, 0.55);

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      // Si el contenedor mide 0 (padre sin altura, aún sin layout, etc.) caemos al
      // viewport: más vale pintar algo que un canvas de 0px que parece un bug.
      width = Math.max(1, Math.round(rect.width || window.innerWidth));
      height = Math.max(1, Math.round(rect.height || window.innerHeight));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* --- Puntero (parallax) --------------------------------------------- */
    let pointerTX = 0;
    let pointerTY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (!paramsRef.current.interactive) return;
      const rect = host.getBoundingClientRect();
      pointerTX = clamp01((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      pointerTY = clamp01((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
    };
    const onPointerLeave = () => {
      pointerTX = 0;
      pointerTY = 0;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    /* --- Estado del bucle ------------------------------------------------ */
    let raf = 0;
    let last = performance.now();
    let rotation = 0;
    let pulse = 0;
    let clock = 0;

    // Buffers reutilizados cada frame (evita presión sobre el GC).
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);

    // En light los pulsos no pueden dibujarse dentro del bucle de tinta: emiten
    // luz, así que se aparcan aquí (x, y, tamaño, alfa) y se pintan en aditivo
    // al final, en una sola pasada. Evita cambiar de composite por partícula.
    const HOT_MAX = 640;
    const hot = new Float32Array(HOT_MAX * 4);
    let hotCount = 0;

    const RAYS = 16;

    // Un brazo logarítmico girando rígidamente cruza cualquier radio fijo en un
    // punto que se desplaza: hacia el centro si el giro acompaña a la curvatura,
    // hacia el borde si va en contra. Eso es lo que se lee como "traga" o
    // "expulsa". La capa secundaria curva al revés (dir -1), así que necesita el
    // signo de giro opuesto a la principal para enroscarse en el mismo sentido.
    // En el agujero negro las dos se enroscan hacia dentro; en el blanco la
    // secundaria se desenrosca hacia fuera, empujando.
    const LAYERS = [
      { armFactor: 1, turnFactor: 1, dir: 1, radius: 1.0, alpha: 1.0, size: 1.0, spin: 1.0, sprite: spriteGlow, rgb: rgbGlow },
      { armFactor: 0.6, turnFactor: 1.35, dir: -1, radius: 0.74, alpha: 0.5, size: 0.72, spin: isLight ? -0.62 : 0.62, sprite: spriteDeep, rgb: rgbDeep },
    ];

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const P = paramsRef.current;

      if (!reduced) {
        rotation += dt * 0.055 * P.speed;
        pulse += dt * 0.13 * P.speed;
        clock += dt;
      }

      // Respiración global: modula radio, brillo y tamaño de partícula.
      const phase = reduced ? 0.45 : (clock % P.breathDuration) / P.breathDuration;
      const br = breathCurve(phase);

      // Parallax suavizado.
      pointerX += (pointerTX - pointerX) * Math.min(1, dt * 2.2);
      pointerY += (pointerTY - pointerY) * Math.min(1, dt * 2.2);

      const cx = width / 2 + pointerX * 22;
      const cy = height / 2 + pointerY * 22;
      // Se desborda el viewport a propósito: los brazos exteriores salen de cuadro.
      const maxR = Math.hypot(width, height) * 0.62;

      const minDim = Math.min(width, height);
      const count = Math.round(Math.max(80, Math.min(190, 80 + minDim * 0.14)));
      if (xs.length !== count) {
        xs = new Float32Array(count);
        ys = new Float32Array(count);
      }

      const globalAlpha = clamp01(P.intensity);
      hotCount = 0;

      /* --- Cielo ---------------------------------------------------------
       * El tema oscuro deja el canvas transparente y suma luz encima. El claro
       * necesita píxeles opacos debajo: `multiply` contra la nada no multiplica.
       */
      if (isLight) {
        const sky = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.18);
        const bloom = 0.1 + 0.055 * br; // el núcleo respira: el blanco se abre y cierra
        sky.addColorStop(0, "#ffffff");
        sky.addColorStop(bloom, css(mixRgb(rgbSkyMid, WHITE, 0.55)));
        sky.addColorStop(bloom + 0.2, css(rgbSkyMid));
        sky.addColorStop(0.62, css(rgbBg));
        sky.addColorStop(1, css(rgbSkyEdge));
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, width, height);

        /* --- Rayos solares ---------------------------------------------
         * El abanico gira en contrafase a las espirales: la fusión sol/espiral
         * está justo ahí, en las dos cadencias cruzándose.
         */
        ctx.globalCompositeOperation = "lighter";
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-rotation * 0.42);
        // Un único gradiente en coordenadas locales, reutilizado por los 16 rayos.
        const rayGrad = ctx.createLinearGradient(0, 0, maxR, 0);
        rayGrad.addColorStop(0, css(rgbCore, 0));
        rayGrad.addColorStop(0.12, css(rgbCore, 0.5));
        rayGrad.addColorStop(0.45, css(rgbCore, 0.22));
        rayGrad.addColorStop(1, css(rgbCore, 0));
        ctx.fillStyle = rayGrad;
        for (let k = 0; k < RAYS; k++) {
          // Cada rayo late a su ritmo: dos senos incomensurables → nunca se repite.
          const wobble = 0.5 + 0.5 * Math.sin(clock * 0.55 + k * 2.399);
          const len = maxR * (0.42 + 0.5 * wobble) * (1 + 0.1 * br);
          const halfW = 0.016 + 0.03 * wobble;
          ctx.globalAlpha = (0.1 + 0.16 * wobble) * (0.55 + 0.45 * br) * globalAlpha;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(-halfW) * len, Math.sin(-halfW) * len);
          ctx.lineTo(Math.cos(halfW) * len, Math.sin(halfW) * len);
          ctx.closePath();
          ctx.fill();
          ctx.rotate((Math.PI * 2) / RAYS);
        }
        ctx.restore();
        ctx.globalAlpha = 1;
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      /* --- Brazos --------------------------------------------------------
       * dark: luz que se suma sobre el vacío. light: tinta que se resta al sol.
       */
      ctx.globalCompositeOperation = isLight ? "multiply" : "lighter";

      for (let li = 0; li < LAYERS.length; li++) {
        const L = LAYERS[li];
        const armCount = Math.max(2, Math.round(P.arms * L.armFactor));
        const layerTurns = P.turns * L.turnFactor;
        const rot = rotation * L.spin * L.dir;
        // La respiración "empuja" la capa secundaria en contrafase: da profundidad.
        const breathR = 1 + (li === 0 ? 0.075 : -0.05) * br;

        for (let a = 0; a < armCount; a++) {
          const armOffset = (a / armCount) * Math.PI * 2;

          // Cada brazo lleva su propio frente de energía. En el agujero blanco
          // sale despedido a velocidad constante; en el negro CAE hacia el
          // núcleo, y el exponente < 1 lo hace acelerar al final: se arrastra
          // por el borde y se precipita en el último tramo, como debe caer algo
          // que está siendo tragado.
          const phase = (pulse + a / armCount + li * 0.37) % 1.35;
          const pulsePos = isLight ? phase : 1.35 * Math.pow(1 - phase / 1.35, 0.7);
          // Y se aviva a medida que se acerca: el último destello antes de caer.
          const infall = isLight ? 1 : 1 + 0.85 * (1 - clamp01(pulsePos));

          for (let i = 0; i < count; i++) {
            // t: 0.08 (cerca del núcleo) → 1 (borde). El exponente > 1 aprieta las
            // vueltas interiores y abre las exteriores: espiral logarítmica.
            const t = 0.08 + 0.92 * ((i + 0.5) / count);
            const r = maxR * Math.pow(t, 1.45) * L.radius * breathR;
            const theta = armOffset + t * layerTurns * Math.PI * 2 * L.dir + rot;
            xs[i] = cx + Math.cos(theta) * r;
            ys[i] = cy + Math.sin(theta) * r;
          }

          // Filamento: hilo finísimo que revela la geometría de la espiral.
          ctx.beginPath();
          ctx.moveTo(xs[0], ys[0]);
          for (let i = 1; i < count; i++) ctx.lineTo(xs[i], ys[i]);
          ctx.strokeStyle = css(
            L.rgb,
            (isLight ? 0.11 + 0.06 * br : 0.045 + 0.035 * br) * L.alpha * globalAlpha,
          );
          ctx.lineWidth = 1;
          ctx.stroke();

          // Nodos.
          for (let i = 0; i < count; i++) {
            const t = 0.08 + 0.92 * ((i + 0.5) / count);

            // Perfil de densidad: nada en el centro (ahí manda el núcleo y va el
            // contenido), pico en la zona media, desvanecido hacia el borde.
            // En light el centro tarda más en aparecer: el blanco se lo come.
            const centerFade = smoothstep((t - 0.08) / (isLight ? 0.3 : 0.24));
            const edgeFade = 1 - smoothstep((t - 0.8) / 0.2);
            let alpha =
              (isLight ? 0.52 : 0.34) * centerFade * edgeFade * (0.55 + 0.45 * br) * L.alpha;

            // Pulso: frente de energía gaussiano recorriendo el brazo hacia afuera.
            const d = t - pulsePos;
            const energy = Math.exp(-(d * d) / 0.0038);

            const size = (1.8 + t * 3.0) * L.size * (1 + 0.12 * br) * (1 + energy * 1.7);
            // dark: el pulso añade neón. light: el pulso QUEMA la tinta y sale
            // como luz por la pasada aditiva de abajo.
            alpha = isLight
              ? alpha * (1 - 0.92 * energy)
              : alpha + energy * 0.4 * L.alpha * infall;
            alpha *= globalAlpha;

            if (isLight && energy > 0.06 && hotCount < HOT_MAX) {
              const h = hotCount++ * 4;
              hot[h] = xs[i];
              hot[h + 1] = ys[i];
              hot[h + 2] = size * (li === 0 ? 5.5 : 3.6);
              hot[h + 3] = Math.min(1, energy * (li === 0 ? 0.75 : 0.42) * globalAlpha);
            }

            if (alpha <= 0.002) continue;

            // La tinta se dibuja más compacta que el neón: si no, en vez de
            // brazos se ve una nube parda.
            const halo = size * (isLight ? 5.4 : 7);
            ctx.globalAlpha = Math.min(1, alpha);
            ctx.drawImage(L.sprite, xs[i] - halo / 2, ys[i] - halo / 2, halo, halo);

            // Núcleo caliente sólo en la cresta del pulso: evita 2x draws por nodo.
            if (!isLight && energy > 0.08 && li === 0) {
              const hs = size * 3.2;
              ctx.globalAlpha = Math.min(1, energy * 0.4 * infall * globalAlpha);
              ctx.drawImage(spriteCore, xs[i] - hs / 2, ys[i] - hs / 2, hs, hs);
            }
          }
        }
      }

      ctx.globalAlpha = 1;

      // Anillos de escaneo: tres circunferencias punteadas que giran con la respiración.
      ctx.setLineDash([2, 15]);
      ctx.lineWidth = 1;
      for (let k = 0; k < 3; k++) {
        const ring = 0.34 + k * 0.22;
        const r = maxR * ring * (1 + 0.06 * br);
        ctx.lineDashOffset = -rotation * 220 * (k % 2 === 0 ? 1 : -1.4);
        ctx.strokeStyle = css(
          isLight ? rgbDeep : rgbGlow,
          (isLight ? 0.1 + 0.08 * br : 0.05 + 0.06 * br) * (1 - k * 0.22) * globalAlpha,
        );
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      /* --- Núcleo --------------------------------------------------------- */
      ctx.globalCompositeOperation = "lighter";

      if (isLight) {
        // Crestas de los pulsos: la tinta quemada devuelta como luz.
        for (let i = 0; i < hotCount; i++) {
          const h = i * 4;
          const s = hot[h + 2];
          ctx.globalAlpha = hot[h + 3];
          ctx.drawImage(spriteCore, hot[h] - s / 2, hot[h + 1] - s / 2, s, s);
        }

        // Agujero blanco: un halo que lava el cielo alrededor y un núcleo cegador
        // dentro. Dos discos, no uno: la caída de un solo gradiente es demasiado
        // suave para leerse como "esto está reventado de luz". El halo se queda
        // corto a propósito — si crece, se traga los brazos y el cuadro entero
        // se vuelve una mancha blanca sin dibujo.
        const halo = maxR * (0.52 + 0.14 * br);
        ctx.globalAlpha = Math.min(1, (0.17 + 0.12 * br) * globalAlpha);
        ctx.drawImage(spriteCore, cx - halo / 2, cy - halo / 2, halo, halo);

        const nucleus = maxR * (0.16 + 0.05 * br);
        ctx.globalAlpha = Math.min(1, (0.62 + 0.3 * br) * globalAlpha);
        ctx.drawImage(spriteCore, cx - nucleus / 2, cy - nucleus / 2, nucleus, nucleus);
      } else {
        // La brasa que late en el centro del agujero negro.
        const coreSize = maxR * (0.42 + 0.1 * br);
        ctx.globalAlpha = (0.06 + 0.1 * br) * globalAlpha;
        ctx.drawImage(spriteGlow, cx - coreSize / 2, cy - coreSize / 2, coreSize, coreSize);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [background, deep, glow, core, isLight]);

  const resolvedMode: NonNullable<BackgroundProps["mode"]> =
    mode ?? (fixed === true ? "fixed" : fixed === false ? "absolute" : children ? "container" : "fixed");

  // "fixed" va detrás del contenido (z -1). "absolute" se apoya en el ancestro
  // posicionado, así que basta con z 0 y que tu contenido sea `relative`.
  const resolvedZ = zIndex ?? (resolvedMode === "fixed" ? -1 : 0);

  const wrapperStyle: CSSProperties = {
    position: resolvedMode === "container" ? "relative" : resolvedMode,
    ...(resolvedMode === "container"
      ? { width: "100%", overflow: "hidden" }
      : { inset: 0, pointerEvents: "none" }),
    zIndex: resolvedZ,
    background,
    isolation: "isolate",
    colorScheme: resolvedTheme,
    ...style,
  };

  const layer: CSSProperties = { position: "absolute", inset: 0, pointerEvents: "none" };

  // La viñeta también se invierte: en oscuro apaga el centro para que el texto
  // respire sobre el neón; en claro lo aclara todavía más (texto oscuro sobre
  // luz) y cierra los bordes en tostado, como el borde quemado de una foto.
  const vignetteLayers = isLight
    ? [
        "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.16) 46%, rgba(255,255,255,0) 76%)",
        "radial-gradient(circle at 50% 50%, rgba(160,86,26,0) 38%, rgba(160,86,26,0.16) 78%, rgba(120,60,16,0.3) 100%)",
      ]
    : [
        "radial-gradient(ellipse 68% 58% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 48%, rgba(0,0,0,0) 78%)",
        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.9) 100%)",
      ];

  return (
    <div ref={hostRef} className={className} style={wrapperStyle} aria-hidden={!children}>
      <canvas ref={canvasRef} style={{ ...layer, display: "block" }} />

      {vignette && <div style={{ ...layer, background: vignetteLayers.join(",") }} />}

      {grain && (
        <div
          style={{
            ...layer,
            // `overlay` sobre un fondo claro revienta a blanco; `multiply` deja
            // el grano como polvo en suspensión delante del sol.
            opacity: isLight ? 0.035 : 0.05,
            mixBlendMode: isLight ? "multiply" : "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>\")",
          }}
        />
      )}

      {children != null && (
        // `pointerEvents: auto` reactiva el ratón: el wrapper lo desactiva en los
        // modos de capa para no bloquear clics de la página que hay debajo.
        <div style={{ position: "relative", zIndex: 1, pointerEvents: "auto" }}>{children}</div>
      )}
    </div>
  );
}

export default Background;
