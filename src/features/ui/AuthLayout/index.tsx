import styles from "./authLayout.module.css";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.AuthLayout}>
      <img src='shop-logo-light.png' alt='shop-square' height='150px' />
      <main>{children}</main>
    </div>
  );
};
