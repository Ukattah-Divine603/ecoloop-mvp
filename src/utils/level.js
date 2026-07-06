export const levels = [
  {
    name: "Eco Starter 🌱",
    min: 0,
    max: 49,
  },

  {
    name: "Eco Explorer 🍃",
    min: 50,
    max: 149,
  },

  {
    name: "Recycling Hero ♻️",
    min: 150,
    max: 299,
  },

  {
    name: "Planet Protector 🌍",
    min: 300,
    max: 499,
  },

  {
    name: "Eco Legend 👑",
    min: 500,
    max: Infinity,
  },
];

export function getLevel(points) {
  return levels.find((level) => points >= level.min && points <= level.max);
}

export function getProgress(points) {
  const level = getLevel(points);

  if (level.max === Infinity) {
    return 100;
  }

  return ((points - level.min) / (level.max - level.min)) * 100;
}
