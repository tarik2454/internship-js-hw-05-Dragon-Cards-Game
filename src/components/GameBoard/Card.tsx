"use client";

import { Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import styles from "./Card.module.scss";
import { cx } from "@/utils/classNames";

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
      className={cx(styles.card, {
        [styles.selected]: isSelected,
        [styles.disabled]: disabled,
        [styles.topRowCard]: isTopRow,
      })}
      onClick={!disabled ? onClick : undefined}
      data-flip-id={!draggableId ? flipId : undefined}
    >
      <div className={cx(styles.cardInner, { [styles.flipped]: flipped })}>
        <div className={cx(styles.cardFace, styles.cardFront)}>
          <Image src={image} fill sizes="200px" alt={alt} />
        </div>
        <div className={cx(styles.cardFace, styles.cardBack)}>
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
            className={cx(styles.draggableWrapper, {
              [styles.dragging]: snapshot.isDragging,
            })}
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
