import Image from "next/image";
import styles from "./Card.module.scss";

interface CardProps {
  image: string;
  alt: string;
}

export const Card = ({ image, alt }: CardProps) => {
  return (
    <div className={styles.card}>
      <Image src={image} width={100} height={100} alt={alt} />
    </div>
  );
};
