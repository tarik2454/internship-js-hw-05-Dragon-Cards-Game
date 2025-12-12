"use client";

import { useState } from "react";
import { BetInput } from "@/components/BetPanel/BetInput";
import { PlaceBetButton } from "@/components/BetPanel/PlaceBetButton";
import { RiskSelector } from "@/components/BetPanel/RiskSelector";
import { CardGrid } from "@/components/GameBoard/CardGrid";
import { MultiplierLabel } from "@/components/GameBoard/MultiplierLabel";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import styles from "./page.module.scss";
import { useBalance } from "@/hooks/useBalance";

export default function GamePage() {
  const [risk, setRisk] = useState<"low" | "medium" | "high" | "classic">(
    "low",
  );

  const balance = useBalance();

  return (
    <PageWrapper>
      <Container className={styles.container}>
        <Section className={styles.section}>
          <div className={styles.gameBlock}>
            <aside className={styles.aside}>
              <div className={styles.asideInner}>
                <BetInput />
                <RiskSelector selected={risk} onChange={(v) => setRisk(v)} />
                <PlaceBetButton />
              </div>

              <div>
                <div className={styles.balanceContainer}>
                  <span className={styles.balance}>Balance:</span>
                  <span className={styles.amount}>{balance.toFixed(2)}</span>
                </div>
              </div>
            </aside>

            <div className={styles.gameBoard}>
              <CardGrid />
              <MultiplierLabel risk={risk} />
            </div>
          </div>
        </Section>
      </Container>
    </PageWrapper>
  );
}
