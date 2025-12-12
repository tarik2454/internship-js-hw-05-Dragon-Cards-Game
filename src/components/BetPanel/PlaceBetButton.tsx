import { Button } from "../ui/Button";
import styles from "./PlaceBetButton.module.scss";

interface PlaceBetButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const PlaceBetButton = ({
  onClick,
  disabled = false,
}: PlaceBetButtonProps) => {
  return (
    <Button
      className={styles.placeBetButton}
      onClick={onClick}
      disabled={disabled}
    >
      Place Bet
    </Button>
  );
};
