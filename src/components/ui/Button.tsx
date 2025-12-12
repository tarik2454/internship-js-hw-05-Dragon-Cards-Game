import React from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  type = "submit",
  className,
  ...props
}: ButtonProps) {
  return (
    <button {...props} type={type} className={cx(styles.button, className)}>
      {children}
    </button>
  );
}
