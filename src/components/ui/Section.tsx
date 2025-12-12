import { ReactNode } from "react";
import cx from "classnames";
import styles from "./Section.module.scss";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={cx(styles.section, className)}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
