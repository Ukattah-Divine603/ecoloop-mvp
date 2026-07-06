export const BADGES = [
  {
    id: 1,
    title: "Eco Starter 🌱",
    required: 0,
  },

  {
    id: 2,
    title: "Waste Warrior ♻️",
    required: 50,
  },

  {
    id: 3,
    title: "Green Guardian 🍃",
    required: 150,
  },

  {
    id: 4,
    title: "Planet Protector 🌍",
    required: 300,
  },

  {
    id: 5,
    title: "Eco Legend 👑",
    required: 500,
  },
];

export function getUnlockedBadges(points) {
  return BADGES.filter((badge) => points >= badge.required);
}
