import React from "react";
import cx from "classnames";
import styles from "./Input.module.scss";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(styles.input, className)} />;
}
