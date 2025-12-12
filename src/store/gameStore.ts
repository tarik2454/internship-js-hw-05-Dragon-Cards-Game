import { create } from "zustand";
import { GameState } from "../types/game.types";

interface GameStore extends GameState {
  setBet: (amount: number) => void;
  startGame: () => void;
  endGame: (win: boolean) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  balance: 1000,
  currentBet: 0,
  gameStatus: "idle",

  setBet: (amount) => set({ currentBet: amount }),
  startGame: () => set({ gameStatus: "playing" }),
  endGame: (win) => set({ gameStatus: win ? "won" : "lost" }),
}));
