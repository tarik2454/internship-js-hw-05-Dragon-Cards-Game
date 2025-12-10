import { useGameStore } from "../store/gameStore";

export const useGame = () => {
  const store = useGameStore();
  return store;
};
