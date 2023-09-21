import styles from "./divider.module.css";

export const Divider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.divider}>
      <small className={styles.dividerText}>{children}</small>
    </div>
  );
};
