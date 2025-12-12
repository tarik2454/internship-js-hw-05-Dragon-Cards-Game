import React from "react";
import styles from "./MultiplierLabel.module.scss";

type Risk = "low" | "medium" | "high" | "classic";

interface MultiplierLabelProps {
  risk: Risk;
}

const MULTIPLIERS: Record<Risk, string[]> = {
  low: ["LOST", "x1", "x2", "x1", "x2.5", "x1.5"],
  medium: ["LOST", "x3", "x5", "LOST", "x6", "x1.5"],
  high: ["LOST", "LOST", "x25", "LOST", "x50", "LOST"],
  classic: ["LOST", "x3.5", "x4", "LOST", "x10", "x7"],
};

export const MultiplierLabel = ({ risk }: MultiplierLabelProps) => {
  const values = MULTIPLIERS[risk];

  return (
    <div className={styles.multiplierLabel}>
      {values.map((val, i) => (
        <div
          key={i}
          className={`${styles.multiplierItem} ${val === "LOST" ? styles.lost : ""}`}
        >
          {val}
        </div>
      ))}
    </div>
  );
};
