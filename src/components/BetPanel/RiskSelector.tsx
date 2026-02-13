"use client";

import styles from "./RiskSelector.module.scss";
import { Button } from "../ui/Button";
import { cx } from "@/utils/classNames";
import { Risk } from "@/utils/generateMultipliers";

interface RiskSelectorProps {
  selected: Risk;
  onChange: (value: Risk) => void;
  disabled?: boolean;
}

export const RiskSelector = ({
  selected,
  onChange,
  disabled,
}: RiskSelectorProps) => {
  return (
    <div className={styles.riskSelector}>
      <p className={styles.riskTitle}>Risk</p>
      <div className={styles.riskSelectorBtnGroup}>
        <Button
          className={cx(styles.riskSelectorBtn, {
            [styles.active]: selected === "low",
          })}
          type="button"
          onClick={() => onChange("low")}
          disabled={disabled}
        >
          Low
        </Button>
        <Button
          type="button"
          className={cx(styles.riskSelectorBtn, {
            [styles.active]: selected === "medium",
          })}
          onClick={() => onChange("medium")}
          disabled={disabled}
        >
          Medium
        </Button>
        <Button
          type="button"
          className={cx(styles.riskSelectorBtn, {
            [styles.active]: selected === "high",
          })}
          onClick={() => onChange("high")}
          disabled={disabled}
        >
          High
        </Button>
        <Button
          type="button"
          className={cx(styles.riskSelectorBtn, {
            [styles.active]: selected === "classic",
          })}
          onClick={() => onChange("classic")}
          disabled={disabled}
        >
          Classic
        </Button>
      </div>
    </div>
  );
};
