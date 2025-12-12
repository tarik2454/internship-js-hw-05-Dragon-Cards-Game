"use client";

import { useState } from "react";
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
}

export const CardGrid = ({
  topRowFlippedStates,
  topRowCards = CARD_DATA,
  bottomRowCards = CARD_DATA,
  onBottomRowChange,
}: CardGridProps) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !onBottomRowChange) {
      return;
    }

    const items = Array.from(bottomRowCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onBottomRowChange(items);
    setSelectedCardIndex(null);
  };

  const handleCardClick = (index: number) => {
    if (!onBottomRowChange) return;

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
              key={index}
              image={card.image}
              alt={card.alt}
              flipped={topRowFlippedStates ? topRowFlippedStates[index] : true}
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
