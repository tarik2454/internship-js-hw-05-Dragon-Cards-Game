import React from "react";
import styles from "./MultiplierLabel.module.scss";
import { MULTIPLIERS, type Risk } from "@/utils/generateMultipliers";

interface MultiplierLabelProps {
  risk: Risk;
}

export const MultiplierLabel = ({ risk }: MultiplierLabelProps) => {
  const values = MULTIPLIERS[risk].map((val) =>
    val === "LOST" ? "LOST" : `x${val}`,
  );

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
