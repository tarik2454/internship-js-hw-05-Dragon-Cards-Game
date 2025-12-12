"use client";

import styles from "./RiskSelector.module.scss";
import { Button } from "../ui/Button";
import cx from "classnames";

interface RiskSelectorProps {
  selected: "low" | "medium" | "high" | "classic";
  onChange: (value: "low" | "medium" | "high" | "classic") => void;
}

export const RiskSelector = ({ selected, onChange }: RiskSelectorProps) => {
  return (
    <div className={styles.riskSelector}>
      <p className={styles.riskTitle}>Risk</p>
      <div className={styles.riskSelectorBtnGroup}>
        <Button
          className={cx(styles.riskSelectotBtn, {
            [styles.active]: selected === "low",
          })}
          type="button"
          onClick={() => onChange("low")}
        >
          Low
        </Button>
        <Button
          type="button"
          className={cx(styles.riskSelectotBtn, {
            [styles.active]: selected === "medium",
          })}
          onClick={() => onChange("medium")}
        >
          Medium
        </Button>
        <Button
          type="button"
          className={cx(styles.riskSelectotBtn, {
            [styles.active]: selected === "high",
          })}
          onClick={() => onChange("high")}
        >
          High
        </Button>
        <Button
          type="button"
          className={cx(styles.riskSelectotBtn, {
            [styles.active]: selected === "classic",
          })}
          onClick={() => onChange("classic")}
        >
          Classic
        </Button>
      </div>
    </div>
  );
};
