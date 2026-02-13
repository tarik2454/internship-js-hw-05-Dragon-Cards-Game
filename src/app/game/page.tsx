"use client";

import { useEffect, useRef, useState } from "react";
import { BetInput } from "@/components/BetPanel/BetInput";
import { PlaceBetButton } from "@/components/BetPanel/PlaceBetButton";
import { RiskSelector } from "@/components/BetPanel/RiskSelector";
import { CardGrid, CARD_DATA } from "@/components/GameBoard/CardGrid";
import { MultiplierLabel } from "@/components/GameBoard/MultiplierLabel";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import styles from "./page.module.scss";
import { useBalance } from "@/hooks/useBalance";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useSound, useSoundStore } from "@/hooks/useSound";
import { useGame } from "@/hooks/useGame";
import { calculateWin } from "@/utils/calculateWin";
import { Risk } from "@/utils/generateMultipliers";

const FLIP_DELAY = 200;
const FLIP_DURATION = 600;

export default function GamePage() {
  const [risk, setRisk] = useState<Risk>("low");
  const [topRowFlippedStates, setTopRowFlippedStates] = useState<boolean[]>(
    Array(6).fill(true),
  );
  const [topRowCards, setTopRowCards] = useState(CARD_DATA);
  const [bottomRowCards, setBottomRowCards] = useState(CARD_DATA);
  const [isFlipping, setIsFlipping] = useState(false);
  const [matchedIndices, setMatchedIndices] = useState<boolean[]>(
    Array(6).fill(false),
  );

  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
    };
  }, []);

  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutIds.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  };

  const balance = useBalance();
  const {
    currentBet,
    gameStatus,
    updateBalance,
    startGame,
    endGame,
    resetGame,
    setLastWinAmount,
    lastWinAmount,
  } = useGame();

  const { playSound } = useSound();
  const isMuted = useSoundStore((state) => state.isMuted);
  const toggleMute = useSoundStore((state) => state.toggleMute);

  const handlePlaceBet = () => {
    playSound("click");

    const isAnyCardRevealed = topRowFlippedStates.some((flipped) => !flipped);

    if (currentBet <= 0 || currentBet > balance || isFlipping) {
      return;
    }

    playSound("reveal");

    if (isAnyCardRevealed) {
      setIsFlipping(true);
      setTopRowFlippedStates(Array(6).fill(true));

      addTimeout(() => {
        resetGame();
        startNewRound();
      }, FLIP_DURATION);
    } else {
      startNewRound();
    }
  };

  const startNewRound = () => {
    clearAllTimeouts();
    startGame();
    setIsFlipping(true);
    setMatchedIndices(Array(6).fill(false));
    updateBalance(-currentBet);

    const shuffledTopRow = [...CARD_DATA].sort(() => Math.random() - 0.5);
    setTopRowCards(shuffledTopRow);

    flipCardsSequentially(shuffledTopRow);
  };

  const flipCardsSequentially = (shuffledTopRow: typeof CARD_DATA) => {
    for (let i = 0; i < shuffledTopRow.length; i++) {
      addTimeout(() => {
        setTopRowFlippedStates((prev) => {
          const newState = [...prev];
          newState[i] = false;
          return newState;
        });

        playSound("cardFlip");

        if (i === shuffledTopRow.length - 1) {
          addTimeout(() => {
            setIsFlipping(false);

            const matches = shuffledTopRow.map(
              (card, index) => card.id === bottomRowCards[index].id,
            );
            setMatchedIndices(matches);

            const matchCount = matches.filter(Boolean).length;
            if (matchCount > 0) {
              for (let j = 0; j < matchCount; j++) {
                addTimeout(() => {
                  playSound("result");
                }, j * 300);
              }
            }

            const totalWin = calculateWin(
              shuffledTopRow,
              bottomRowCards,
              risk,
              currentBet,
            );

            if (totalWin > 0) {
              updateBalance(totalWin);
              setLastWinAmount(totalWin);

              endGame("won");
            } else {
              endGame("lost");
            }
          }, FLIP_DURATION);
        }
      }, i * FLIP_DELAY);
    }
  };

  return (
    <PageWrapper>
      <Container className={styles.container}>
        <Section className={styles.section}>
          <div className={styles.gameBlock}>
            <aside className={styles.aside}>
              <div className={styles.asideInner}>
                <BetInput disabled={isFlipping || gameStatus === "playing"} />
                <RiskSelector
                  selected={risk}
                  onChange={(v) => setRisk(v)}
                  disabled={isFlipping || gameStatus === "playing"}
                />
                <PlaceBetButton
                  onClick={handlePlaceBet}
                  disabled={
                    isFlipping ||
                    gameStatus === "playing" ||
                    currentBet <= 0 ||
                    currentBet > balance
                  }
                />
              </div>

              <div>
                {gameStatus === "won" && lastWinAmount !== null && (
                  <div className={`${styles.gameMessage} ${styles.won}`}>
                    You Won {lastWinAmount.toFixed(2)}!
                  </div>
                )}
                {gameStatus === "lost" && currentBet > 0 && (
                  <div className={`${styles.gameMessage} ${styles.lost}`}>
                    You Lost {currentBet.toFixed(2)}
                  </div>
                )}

                <div className={styles.balanceContainer}>
                  <span className={styles.balance}>Balance:</span>
                  <span className={styles.amount}>{balance.toFixed(2)}</span>
                </div>
              </div>
            </aside>

            <div className={styles.gameBoard}>
              <Button
                type="button"
                className={styles.soundButton}
                onClick={toggleMute}
              >
                <Image
                  src={
                    isMuted ? "/images/sound-off.svg" : "/images/sound-on.svg"
                  }
                  alt="Sound Button"
                  width={25}
                  height={25}
                />
              </Button>

              <CardGrid
                topRowFlippedStates={topRowFlippedStates}
                topRowCards={topRowCards}
                bottomRowCards={bottomRowCards}
                onBottomRowChange={setBottomRowCards}
                disabled={isFlipping || gameStatus === "playing"}
              />
              <MultiplierLabel risk={risk} matchedIndices={matchedIndices} />
            </div>
          </div>
        </Section>
      </Container>
    </PageWrapper>
  );
}
