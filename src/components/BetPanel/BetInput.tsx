import React from "react";
import { Input } from "../ui/Input";
import styles from "./BetInput.module.scss";

export const BetInput = () => {
  return (
    <div className={styles.betInput}>
      <Input type="number" placeholder="Enter bet amount" />
    </div>
  );
};
