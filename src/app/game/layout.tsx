import React from "react";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
