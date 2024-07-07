import { hierarchy, treemap, treemapSquarify } from "d3-hierarchy";
import { motion } from "framer-motion";

export interface SanityImagePalette {
  _type: "sanity.imagePalette";
  darkMuted: SanityImagePaletteSwatch;
  darkVibrant: SanityImagePaletteSwatch;
  dominant: SanityImagePaletteSwatch;
  lightMuted: SanityImagePaletteSwatch;
  lightVibrant: SanityImagePaletteSwatch;
  muted: SanityImagePaletteSwatch;
  vibrant: SanityImagePaletteSwatch;
}
export interface SanityImagePaletteSwatch {
  _type: "sanity.imagePaletteSwatch";
  background: string;
  foreground: string;
  population: number;
  title: string;
}

type Node = {
  name: string;
  color: SanityImagePaletteSwatch["background"];
  total: SanityImagePaletteSwatch["population"];
};

const palette = {
  lightVibrant: {
    title: "#000",
    population: 5.9,
    background: "#fac89e",
    _type: "sanity.imagePaletteSwatch",
    foreground: "#000",
  },
  darkVibrant: {
    title: "#fff",
    population: 0.05,
    background: "#3a1d08",
    _type: "sanity.imagePaletteSwatch",
    foreground: "#fff",
  },
  lightMuted: {
    foreground: "#000",
    title: "#fff",
    population: 8.01,
    background: "#cfb096",
    _type: "sanity.imagePaletteSwatch",
  },
  vibrant: {
    background: "#b17941",
    _type: "sanity.imagePaletteSwatch",
    foreground: "#fff",
    title: "#fff",
    population: 6.86,
  },
  dominant: {
    background: "#cfb096",
    _type: "sanity.imagePaletteSwatch",
    foreground: "#000",
    title: "#fff",
    population: 8.01,
  },
  _type: "sanity.imagePalette",
  darkMuted: {
    background: "#57332a",
    _type: "sanity.imagePaletteSwatch",
    foreground: "#fff",
    title: "#fff",
    population: 1.99,
  },
  muted: {
    background: "#a97460",
    _type: "sanity.imagePaletteSwatch",
    foreground: "#fff",
    title: "#fff",
    population: 3.45,
  },
};

export function ExitTreemap() {
  const paletteData: { children: Node[] } = {
    children: [
      {
        name: "darkMuted",
        color: palette.darkMuted.background,
        total: palette.darkMuted.population,
      },
      {
        name: "darkVibrant",
        color: palette.darkVibrant.background,
        total: palette.darkVibrant.population,
      },
      {
        name: "lightMuted",
        color: palette.lightMuted.background,
        total: palette.lightMuted.population,
      },
      {
        name: "lightVibrant",
        color: palette.lightVibrant.background,
        total: palette.lightVibrant.population,
      },
      {
        name: "muted",
        color: palette.muted.background,
        total: palette.muted.population,
      },
      {
        name: "vibrant",
        color: palette.vibrant.background,
        total: palette.vibrant.population,
      },
    ],
  };

  const root = hierarchy(paletteData).sum((d) => (d as unknown as Node).total);
  const leaves = root.leaves();

  treemap().tile(treemapSquarify).size([100, 100]).padding(0).round(true)(root);

  return (
    <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
      {leaves.map((leaf: any, i) => (
        <LeafExit
          x0={leaf.x0}
          x1={leaf.x1}
          y0={leaf.y0}
          y1={leaf.y1}
          color={leaf.data.color}
          index={i}
          key={i}
        />
      ))}
    </div>
  );
}

export function EnterTreemap() {
  const paletteData: { children: Node[] } = {
    children: [
      {
        name: "darkMuted",
        color: palette.darkMuted.background,
        total: palette.darkMuted.population,
      },
      {
        name: "darkVibrant",
        color: palette.darkVibrant.background,
        total: palette.darkVibrant.population,
      },
      {
        name: "lightMuted",
        color: palette.lightMuted.background,
        total: palette.lightMuted.population,
      },
      {
        name: "lightVibrant",
        color: palette.lightVibrant.background,
        total: palette.lightVibrant.population,
      },
      {
        name: "muted",
        color: palette.muted.background,
        total: palette.muted.population,
      },
      {
        name: "vibrant",
        color: palette.vibrant.background,
        total: palette.vibrant.population,
      },
    ],
  };

  const root = hierarchy(paletteData).sum((d) => (d as unknown as Node).total);
  const leaves = root.leaves();

  treemap().tile(treemapSquarify).size([100, 100]).padding(0).round(true)(root);

  return (
    <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
      {leaves.map((leaf: any, i) => (
        <LeafEnter
          x0={leaf.x0}
          x1={leaf.x1}
          y0={leaf.y0}
          y1={leaf.y1}
          color={leaf.data.color}
          index={i}
          key={i}
        />
      ))}
    </div>
  );
}

function LeafExit({
  x0,
  x1,
  y0,
  y1,
  color,
  index,
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      className="absolute"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{
        scaleY: 1,
        transition: {
          duration: 0.6,
          // delay: index * 0.1,
        },
      }}
      style={{
        top: `${y0}%`,
        left: `${x0}%`,
        width: `${x1 - x0}%`,
        height: `${y1 - y0}%`,
        background: color,
        transformOrigin: "bottom",
      }}
    />
  );
}

function LeafEnter({
  x0,
  x1,
  y0,
  y1,
  color,
  index,
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      className="absolute"
      initial={{ scaleY: 1 }}
      animate={{
        scaleY: 0,
        transition: {
          // delay: index * 0.1,
          duration: 0.8,
        },
      }}
      style={{
        top: `${y0}%`,
        left: `${x0}%`,
        width: `${x1 - x0}%`,
        height: `${y1 - y0}%`,
        background: color,
        transformOrigin: "top",
      }}
    />
  );
}
