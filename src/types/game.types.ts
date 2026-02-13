export type Card = {
  id: string;
  value: number;
  suit: string;
  isRevealed: boolean;
};

export type GameState = {
  balance: number;
  currentBet: number;
  gameStatus: "idle" | "playing" | "won" | "lost";
};
