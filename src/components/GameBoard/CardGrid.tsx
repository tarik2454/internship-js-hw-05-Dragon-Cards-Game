"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Card } from "./Card";
import styles from "./CardGrid.module.scss";

export const CARD_DATA = [
  { id: "earth", image: "/images/cards/earth.png", alt: "Earth Card" },
  { id: "fire", image: "/images/cards/fire.png", alt: "Fire Card" },
  { id: "frost", image: "/images/cards/frost.png", alt: "Frost Card" },
  { id: "shadow", image: "/images/cards/shadow.png", alt: "Shadow Card" },
  { id: "storm", image: "/images/cards/storm.png", alt: "Storm Card" },
  { id: "empty", image: "/images/cards/empty.png", alt: "Empty Card" },
];

interface CardGridProps {
  topRowFlippedStates?: boolean[];
  topRowCards?: typeof CARD_DATA;
  bottomRowCards?: typeof CARD_DATA;
  onBottomRowChange?: (cards: typeof CARD_DATA) => void;
  disabled?: boolean;
}

export const CardGrid = ({
  topRowFlippedStates,
  topRowCards = CARD_DATA,
  bottomRowCards = CARD_DATA,
  onBottomRowChange,
  disabled = false,
}: CardGridProps) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const prevPositions = useRef<Record<string, DOMRect>>({});
  const ignoreNextFlip = useRef(false);

  useLayoutEffect(() => {
    const newPositions: Record<string, DOMRect> = {};
    const elements = document.querySelectorAll("[data-flip-id]");
    elements.forEach((el) => {
      const id = el.getAttribute("data-flip-id");
      if (id) newPositions[id] = el.getBoundingClientRect();
    });

    if (ignoreNextFlip.current) {
      ignoreNextFlip.current = false;
      prevPositions.current = newPositions;
      return;
    }

    Object.keys(newPositions).forEach((id) => {
      const prev = prevPositions.current[id];
      const current = newPositions[id];
      if (prev && current) {
        const deltaX = prev.left - current.left;
        const deltaY = prev.top - current.top;

        if (deltaX !== 0 || deltaY !== 0) {
          const element = document.querySelector(
            `[data-flip-id='${id}']`,
          ) as HTMLElement;
          if (element) {
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            element.style.transition = "none";

            requestAnimationFrame(() => {
              // Force reflow
              element.getBoundingClientRect();
              element.style.transition = "transform 300ms ease";
              element.style.transform = "";
            });

            setTimeout(() => {
              element.style.transition = "";
            }, 300);
          }
        }
      }
    });

    prevPositions.current = newPositions;
  }); // Run on every render to capture latest positions

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !onBottomRowChange || disabled) {
      return;
    }

    ignoreNextFlip.current = true;

    const items = Array.from(bottomRowCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onBottomRowChange(items);
    setSelectedCardIndex(null);
  };

  const handleCardClick = (index: number) => {
    if (!onBottomRowChange || disabled) return;

    if (selectedCardIndex === null) {
      setSelectedCardIndex(index);
    } else if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
    } else {
      const items = Array.from(bottomRowCards);
      const temp = items[selectedCardIndex];
      items[selectedCardIndex] = items[index];
      items[index] = temp;

      onBottomRowChange(items);
      setSelectedCardIndex(null);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.cardGrid}>
        <div className={styles.topRow}>
          {topRowCards.map((card, index) => (
            <Card
              key={card.id}
              image={card.image}
              alt={card.alt}
              flipped={topRowFlippedStates ? topRowFlippedStates[index] : true}
              isTopRow={true}
            />
          ))}
        </div>

        <Droppable droppableId="bottom-row" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.bottomRow}
            >
              {bottomRowCards.map((card, index) => (
                <Card
                  key={card.id}
                  draggableId={card.id}
                  index={index}
                  image={card.image}
                  alt={card.alt}
                  flipped={false}
                  isSelected={selectedCardIndex === index}
                  onClick={() => handleCardClick(index)}
                  flipId={`bottom-${card.id}`}
                  disabled={disabled}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
