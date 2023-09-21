import styles from "./spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Spinner}></div>
    </div>
  );
};
