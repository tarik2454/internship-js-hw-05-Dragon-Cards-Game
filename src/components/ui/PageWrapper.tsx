import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./PageWrapper.module.scss";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className = "" }: PageWrapperProps) => (
  <div className={cx(styles.wrapper, className)}>{children}</div>
);
