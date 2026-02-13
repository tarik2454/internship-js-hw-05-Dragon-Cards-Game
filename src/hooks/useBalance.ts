import { useGameStore } from "../store/gameStore";

export const useBalance = () => {
  const balance = useGameStore((state) => state.balance);
  return balance;
};
