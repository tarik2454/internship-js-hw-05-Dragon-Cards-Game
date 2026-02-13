import React from "react";
import { cx } from "@/utils/classNames";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
}

export function Input({ label, className, type, ...props }: InputProps) {
  const id = React.useId();

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        type={type}
        className={cx(styles.input, className)}
      />
    </div>
  );
}
