import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Risk } from "@/utils/generateMultipliers";

interface GameState {
  balance: number;
  currentBet: number;
  gameStatus: "idle" | "playing" | "won" | "lost" | "cashed_out";
  risk: Risk;
  openedCards: number[];
  deadlyCardIndex: number | null;
  currentMultiplier: number;
  lastWinAmount: number | null; // Added
  
  setBet: (amount: number) => void;
  setRisk: (risk: Risk) => void;
  startGame: (deadlyCardIndex: number) => void;
  openCard: (index: number, multiplier: number) => void;
  endGame: (status: "won" | "lost" | "cashed_out") => void;
  updateBalance: (amount: number) => void;
  setLastWinAmount: (amount: number | null) => void; // Added
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      balance: 1000,
      currentBet: 0,
      gameStatus: "idle",
      risk: "low",
      openedCards: [],
      deadlyCardIndex: null,
      currentMultiplier: 1,
      lastWinAmount: null, // Added

      setBet: (amount) => set({ currentBet: amount }),
      setRisk: (risk) => set({ risk }),
      startGame: (deadlyCardIndex) =>
        set({
          gameStatus: "playing",
          openedCards: [],
          deadlyCardIndex,
          currentMultiplier: 1,
          lastWinAmount: null, // Reset on start
        }),
      openCard: (index, multiplier) =>
        set((state) => ({
          openedCards: [...state.openedCards, index],
          currentMultiplier: multiplier,
        })),
      endGame: (status) => set({ gameStatus: status }),
      updateBalance: (amount) =>
        set((state) => ({ balance: Math.max(0, state.balance + amount) })),
      setLastWinAmount: (amount) => set({ lastWinAmount: amount }), // Added
      resetGame: () =>
        set({
          gameStatus: "idle",
          openedCards: [],
          deadlyCardIndex: null,
          currentMultiplier: 1,
          lastWinAmount: null,
        }),
    }),
    {
      name: "dragon-game-storage",
      partialize: (state) => ({ balance: state.balance }),
    },
  ),
);
