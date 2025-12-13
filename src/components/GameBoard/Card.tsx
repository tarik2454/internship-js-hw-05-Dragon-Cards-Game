"use client";

import { Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import styles from "./Card.module.scss";

interface CardProps {
  image: string;
  alt: string;
  flipped?: boolean;
  draggableId?: string;
  index?: number;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  flipId?: string;
  isTopRow?: boolean;
}

export const Card = ({
  image,
  alt,
  flipped = true,
  draggableId,
  index,
  isSelected = false,
  onClick,
  disabled = false,
  flipId,
  isTopRow = false,
}: CardProps) => {
  const cardContent = (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""} ${
        disabled ? styles.disabled : ""
      } ${isTopRow ? styles.topRowCard : ""}`}
      onClick={!disabled ? onClick : undefined}
      data-flip-id={!draggableId ? flipId : undefined}
    >
      <div className={`${styles.cardInner} ${flipped ? styles.flipped : ""}`}>
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <Image src={image} fill sizes="200px" alt={alt} />
        </div>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <Image
            src="/images/cards/backface.png"
            fill
            sizes="200px"
            alt="Card Back"
          />
        </div>
      </div>
    </div>
  );

  if (draggableId !== undefined && index !== undefined && !disabled) {
    return (
      <Draggable draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? styles.dragging : ""} ${styles.draggableWrapper}`}
            style={{
              ...provided.draggableProps.style,
            }}
            data-flip-id={flipId}
          >
            {cardContent}
          </div>
        )}
      </Draggable>
    );
  }

  return cardContent;
};
