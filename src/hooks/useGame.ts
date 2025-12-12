import { useGameStore } from "../store/gameStore";

export const useGame = () => {
  const currentBet = useGameStore((state) => state.currentBet);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const lastWinAmount = useGameStore((state) => state.lastWinAmount);

  const updateBalance = useGameStore((state) => state.updateBalance);
  const startGame = useGameStore((state) => state.startGame);
  const endGame = useGameStore((state) => state.endGame);
  const resetGame = useGameStore((state) => state.resetGame);
  const setLastWinAmount = useGameStore((state) => state.setLastWinAmount);

  return {
    currentBet,
    gameStatus,
    lastWinAmount,
    updateBalance,
    startGame,
    endGame,
    resetGame,
    setLastWinAmount,
  };
};
