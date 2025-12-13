import React from "react";
import styles from "./MultiplierLabel.module.scss";
import { MULTIPLIERS, type Risk } from "@/utils/generateMultipliers";

interface MultiplierLabelProps {
  risk: Risk;
  matchedIndices?: boolean[];
}

export const MultiplierLabel = ({
  risk,
  matchedIndices = [],
}: MultiplierLabelProps) => {
  const values = MULTIPLIERS[risk].map((val) =>
    val === "LOST" ? "LOST" : `${val}x`,
  );

  return (
    <div className={styles.multiplierLabel}>
      {values.map((val, i) => {
        const isMatched = matchedIndices[i] || false;
        const isLost = val === "LOST";

        let className = styles.multiplierItem;
        if (isMatched && !isLost) {
          className += ` ${styles.matched}`;
        } else if (isMatched && isLost) {
          className += ` ${styles.matchedLost}`;
        }

        return (
          <div key={i} className={className}>
            {val}
          </div>
        );
      })}
    </div>
  );
};
