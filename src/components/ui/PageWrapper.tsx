import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./PageWrapper.module.scss";
import { Container } from "./Container";

interface PageWrapperProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
  withContainer?: boolean;
}

export function PageWrapper({
  children,
  title,
  className = "",
  withContainer = true,
}: PageWrapperProps) {
  const inner = (
    <div className={cx(styles.wrapper, className)}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );

  return withContainer ? (
    <Container className={styles.host}>{inner}</Container>
  ) : (
    inner
  );
}
