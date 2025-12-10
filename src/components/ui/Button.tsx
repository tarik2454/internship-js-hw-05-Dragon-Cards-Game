import React from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cx(styles.button, className)}>
      {children}
    </button>
  );
}
