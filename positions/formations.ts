interface Player {
  name: string;
  position: { x: number; y: number };
  role: string;
  // You can add more properties as needed
}

interface Formation {
  name: string;
  players: Player[];
}

export const formations: any = [
  {
    name: "4-3-3-1",
    players: [
      { name: "Player 1", position: { x: 100, y: 30 }, role: "ST" },
      { name: "Player 2", position: { x: 190, y: 65 }, role: "RW" },
      { name: "Player 3", position: { x: 10, y: 65 }, role: "LW" },
      { name: "Player 4", position: { x: -30, y: 170 }, role: "CM" },
      { name: "Player 5", position: { x: 100, y: 170 }, role: "CM" },
      { name: "Player 6", position: { x: 230, y: 170 }, role: "CM" },
      { name: "Player 7", position: { x: -100, y: 275 }, role: "LB" },
      { name: "Player 8", position: { x: 40, y: 275 }, role: "CB" },
      { name: "Player 9", position: { x: 180, y: 275 }, role: "CB" },
      { name: "Player 10", position: { x: 300, y: 275 }, role: "RB" },
      { name: "Player 11", position: { x: 100, y: 390 }, role: "GK" },
    ],
  },
  {
    name: "4-3-2-1",
    players: [
      { name: "Player 1", position: { x: 100, y: 30 }, role: "ST" },
      { name: "Player 2", position: { x: 190, y: 65 }, role: "RW" },
      { name: "Player 3", position: { x: 10, y: 65 }, role: "LW" },
      { name: "Player 4", position: { x: -80, y: 150 }, role: "LM" },
      { name: "Player 5", position: { x: 40, y: 170 }, role: "CM" },
      { name: "Player 6", position: { x: 280, y: 150 }, role: "RM" },
      { name: "Player 7", position: { x: -50, y: 295 }, role: "CB" },
      { name: "Player 8", position: { x: 100, y: 275 }, role: "CB" },
      { name: "Player 9", position: { x: 180, y: 170 }, role: "CM" },
      { name: "Player 10", position: { x: 250, y: 295 }, role: "CB" },
      { name: "Player 11", position: { x: 100, y: 390 }, role: "GK" },
    ],
  },
];

export const initFormation = {
  players: [
    { name: "Player 1", position: { x: 100, y: 30 }, role: "ST" },
    { name: "Player 2", position: { x: 190, y: 65 }, role: "RW" },
    { name: "Player 3", position: { x: 10, y: 65 }, role: "LW" },
    { name: "Player 4", position: { x: -30, y: 170 }, role: "CM" },
    { name: "Player 5", position: { x: 100, y: 170 }, role: "CM" },
    { name: "Player 6", position: { x: 230, y: 170 }, role: "CM" },
    { name: "Player 7", position: { x: -100, y: 275 }, role: "LB" },
    { name: "Player 8", position: { x: 40, y: 275 }, role: "CB" },
    { name: "Player 9", position: { x: 180, y: 275 }, role: "CB" },
    { name: "Player 10", position: { x: 300, y: 275 }, role: "RB" },
    { name: "Player 11", position: { x: 100, y: 390 }, role: "GK" },
  ],
};
