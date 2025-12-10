import React from "react";
import styles from "./CardGrid.module.scss";

export const CardGrid = () => {
  return (
    <div className={styles.cardGrid}>
      {/* Cards will go here */}
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </div>
  );
};
