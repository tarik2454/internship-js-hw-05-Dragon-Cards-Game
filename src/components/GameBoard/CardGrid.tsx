import { Card } from "./Card";
import styles from "./CardGrid.module.scss";

const CARD_DATA = [
  { image: "/images/cards/earth.png", alt: "Earth Card" },
  { image: "/images/cards/fire.png", alt: "Fire Card" },
  { image: "/images/cards/frost.png", alt: "Frost Card" },
  { image: "/images/cards/shadow.png", alt: "Shadow Card" },
  { image: "/images/cards/storm.png", alt: "Storm Card" },
  { image: "/images/cards/empty.png", alt: "Empty Card" },
];

export const CardGrid = () => {
  return (
    <div className={styles.cardGrid}>
      {CARD_DATA.map((card, index) => (
        <Card key={index} image={card.image} alt={card.alt} />
      ))}
    </div>
  );
};
