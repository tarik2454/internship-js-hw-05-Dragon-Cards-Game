import React from "react";
import styles from "./RiskSelector.module.scss";

export const RiskSelector = () => {
  return (
    <div className={styles.riskSelector}>
      <label>Risk Level:</label>
      <select>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
};
