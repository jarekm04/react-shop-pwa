import styles from "./cartIcon.module.css";

const Badge = ({ count }: { count: number }) => {
  return count !== 0 ? <div className={styles.Badge}>{count}</div> : <></>;
};

export default Badge;
