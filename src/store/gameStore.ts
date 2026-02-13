import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  balance: number;
  currentBet: number;
  gameStatus: "idle" | "playing" | "won" | "lost" | "cashed_out";
  lastWinAmount: number | null;

  setBet: (amount: number) => void;
  startGame: () => void;
  endGame: (status: "won" | "lost" | "cashed_out") => void;
  updateBalance: (amount: number) => void;
  setLastWinAmount: (amount: number | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      balance: 1000,
      currentBet: 0,
      gameStatus: "idle",
      lastWinAmount: null,

      setBet: (amount) => set({ currentBet: amount }),
      startGame: () =>
        set({
          gameStatus: "playing",
          lastWinAmount: null,
        }),
      endGame: (status) => set({ gameStatus: status }),
      updateBalance: (amount) =>
        set((state) => ({ balance: Math.max(0, state.balance + amount) })),
      setLastWinAmount: (amount) => set({ lastWinAmount: amount }),
      resetGame: () =>
        set({
          gameStatus: "idle",
          lastWinAmount: null,
        }),
    }),
    {
      name: "dragon-game-storage",
      partialize: (state) => ({ balance: state.balance }),
    },
  ),
);
