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
        <Section>
          <div className={styles.gamePage}>
            <aside className={styles.aside}>
              <BetInput />
              <RiskSelector />

              <PlaceBetButton />
            </aside>

            <div>
              <div>
                <CardGrid />
                <div>
                  <MultiplierLabel />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </PageWrapper>
  );
}
