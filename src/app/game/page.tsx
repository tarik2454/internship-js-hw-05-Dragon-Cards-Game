import { BetInput } from "@/components/BetPanel/BetInput";
import { PlaceBetButton } from "@/components/BetPanel/PlaceBetButton";
import { RiskSelector } from "@/components/BetPanel/RiskSelector";
import { CardGrid } from "@/components/GameBoard/CardGrid";
import { MultiplierLabel } from "@/components/GameBoard/MultiplierLabel";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import styles from "./page.module.scss";

export default function GamePage() {
  return (
    <PageWrapper>
      <Container>
        <Section title="Welcome to Dragon Cards!">
          <div className={styles.gamePage}>
            <h1 className={styles.title}>Dragon Cards</h1>

            <div className={styles.grid}>
              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Game Board</h2>
                <CardGrid />
                <div className={styles.multiplierContainer}>
                  <MultiplierLabel />
                </div>
              </div>

              <div className={styles.panel}>
                <h2 className={styles.panelTitle}>Controls</h2>
                <div className={styles.controls}>
                  <BetInput />
                  <RiskSelector />
                  <PlaceBetButton />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </PageWrapper>
  );
}
