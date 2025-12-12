import React from "react";
import { Input } from "../ui/Input";
import styles from "./BetInput.module.scss";
import { Button } from "../ui/Button";

export const BetInput = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.amount}>Bet Amount</p>
      <div className={styles.labelWrapper}>
        <div className={styles.maxBet}>Max bet: 1000.00</div>
        <span className={styles.currency}>$</span>
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.buttonWrapper}>
          <Button type="button" className={styles.button}>
            1/2
          </Button>
          <Button type="button" className={styles.button}>
            x2
          </Button>
          <Button type="button" className={styles.button}>
            Max
          </Button>
        </div>
        <Input type="number" className={styles.input} />
      </div>
    </div>
  );
};
