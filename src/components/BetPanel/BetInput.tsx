"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import styles from "./BetInput.module.scss";
import { Button } from "../ui/Button";
import { useGameStore } from "@/store/gameStore";

const MAX_BET = 1000;
const MIN_BET = 0.01;

export const BetInput = () => {
  interface GameStoreSelector {
    setBet: (amount: number) => void;
  }

  const setBetInStore = useGameStore((s: GameStoreSelector) => s.setBet);
  const [bet, setBet] = useState<number>(1);

  React.useEffect(() => {
    setBetInStore(1);
  }, [setBetInStore]);

  const updateBet = (value: number) => {
    const clamped = Math.max(MIN_BET, Math.min(MAX_BET, Number(value)));
    setBet(clamped);
    setBetInStore(clamped);
  };

  const applyHalf = () => updateBet(Number((bet / 2).toFixed(2)));
  const applyDouble = () => updateBet(Number((bet * 2).toFixed(2)));
  const applyMax = () => updateBet(MAX_BET);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (Number.isNaN(val)) return;
    updateBet(val);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.amount}>Bet Amount</p>
      <div className={styles.labelWrapper}>
        <div className={styles.maxBet}>Max bet: {MAX_BET.toFixed(2)}</div>
        <span className={styles.currency}>$</span>
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.buttonWrapper}>
          <Button type="button" className={styles.button} onClick={applyHalf}>
            1/2
          </Button>
          <Button type="button" className={styles.button} onClick={applyDouble}>
            x2
          </Button>
          <Button type="button" className={styles.button} onClick={applyMax}>
            Max
          </Button>
        </div>
        <Input
          type="number"
          className={styles.input}
          value={bet}
          onChange={onChange}
          min={MIN_BET}
          max={MAX_BET}
          step="0.01"
        />
      </div>
    </div>
  );
};
