export type Level = {
  level: number;
  name: string;
  emoji: string;
  minXP: number;
  maxXP: number;
};

export const LEVELS: Level[] = [
  { level: 1,  name: "Newcomer",     emoji: "🌱", minXP: 0,    maxXP: 150   },
  { level: 2,  name: "Learner",      emoji: "📖", minXP: 150,  maxXP: 400   },
  { level: 3,  name: "Explorer",     emoji: "🗺️", minXP: 400,  maxXP: 750   },
  { level: 4,  name: "Scholar",      emoji: "🎓", minXP: 750,  maxXP: 1200  },
  { level: 5,  name: "Apprentice",   emoji: "⚡", minXP: 1200, maxXP: 1800  },
  { level: 6,  name: "Practitioner", emoji: "🏅", minXP: 1800, maxXP: 2600  },
  { level: 7,  name: "Expert",       emoji: "🥈", minXP: 2600, maxXP: 3600  },
  { level: 8,  name: "Master",       emoji: "🥇", minXP: 3600, maxXP: 5000  },
  { level: 9,  name: "Champion",     emoji: "🏆", minXP: 5000, maxXP: 7000  },
  { level: 10, name: "Legend",       emoji: "👑", minXP: 7000, maxXP: Infinity },
];

export function getLevelForXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getProgressToNextLevel(xp: number): { pct: number; xpInLevel: number; xpNeeded: number } {
  const level = getLevelForXP(xp);
  if (level.maxXP === Infinity) return { pct: 100, xpInLevel: xp - level.minXP, xpNeeded: 0 };
  const xpInLevel = xp - level.minXP;
  const xpNeeded = level.maxXP - level.minXP;
  return { pct: Math.round((xpInLevel / xpNeeded) * 100), xpInLevel, xpNeeded };
}
