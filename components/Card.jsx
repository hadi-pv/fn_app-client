import styles from "../styles/card.module.css";

const Card = ({ children }) => {
  return <div className={styles.newsCard}>{children}</div>;
};

export default Card;
