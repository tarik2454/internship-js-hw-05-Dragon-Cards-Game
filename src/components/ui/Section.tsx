import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./Section.module.scss";

interface SectionProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  background?: boolean;
  padding?: "sm" | "md" | "lg";
  bordered?: boolean;
  id?: string;
}

export function Section({
  children,
  title,
  subtitle,
  className = "",
  background = false,
  padding = "md",
  bordered = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx(styles.section, className, {
        [styles.background]: background,
        [styles.bordered]: bordered,
        [styles[`padding-${padding}`]]: padding,
      })}
    >
      {title && <h2 className={styles.title}>{title}</h2>}

      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
