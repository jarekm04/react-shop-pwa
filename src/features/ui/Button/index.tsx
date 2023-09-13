import styles from "./button.module.css";

const Button2 = ({ handleClick, children }: { handleClick: () => void; children: React.ReactNode }) => {
  return (
    <button className={styles.Button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button2;
