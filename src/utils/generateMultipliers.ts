export type Risk = "low" | "medium" | "high" | "classic";

export const MULTIPLIERS: Record<Risk, (number | "LOST")[]> = {
  low: ["LOST", 1, 2, 1, 2.5, 1.5],
  medium: ["LOST", 3, 5, "LOST", 6, 1.5],
  high: ["LOST", "LOST", 25, "LOST", 50, "LOST"],
  classic: ["LOST", 3.5, 4, "LOST", 10, 7],
};

export const getMultiplier = (
  risk: Risk,
  cardIndex: number,
): number | "LOST" => {
  return MULTIPLIERS[risk][cardIndex] ?? "LOST";
};
