import { getMultiplier, type Risk } from "./generateMultipliers";

interface CardItem {
  id: string;
}

export const calculateWin = (
  shuffledTopRow: CardItem[],
  bottomRowCards: CardItem[],
  risk: Risk,
  betAmount: number,
): number => {
  let totalWin = 0;

  for (let j = 0; j < shuffledTopRow.length; j++) {
    const topCard = shuffledTopRow[j];
    const bottomCard = bottomRowCards[j];

    if (topCard.id === bottomCard.id) {
      const multiplier = getMultiplier(risk, j);
      if (multiplier !== "LOST" && typeof multiplier === "number") {
        totalWin += betAmount * multiplier;
      }
    }
  }

  return totalWin;
};
