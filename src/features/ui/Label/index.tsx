import styles from "./label.module.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label className={styles.Label} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
