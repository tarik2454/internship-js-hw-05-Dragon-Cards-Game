import styles from "./RiskSelector.module.scss";
import { Button } from "../ui/Button";

export const RiskSelector = () => {
  return (
    <div className={styles.riskSelector}>
      <p className={styles.riskTitle}>Risk</p>
      <div className={styles.riskSelectorBtnGroup}>
        <Button className={styles.riskSelectotBtn} type="button">
          Low
        </Button>
        <Button type="button" className={styles.riskSelectotBtn}>
          Medium
        </Button>
        <Button type="button" className={styles.riskSelectotBtn}>
          High
        </Button>
        <Button type="button" className={styles.riskSelectotBtn}>
          Classic
        </Button>
      </div>
    </div>
  );
};
