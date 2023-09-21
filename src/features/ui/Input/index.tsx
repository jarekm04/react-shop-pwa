import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  error: boolean;
  helperText: string;
}

export const Input = ({ type, value, error, helperText, handleChange, handleBlur }: InputProps) => {
  return (
    <div className={styles.Wrapper}>
      <input className={error ? styles.InputError : styles.Input} type={type} value={value} onChange={handleChange} onBlur={handleBlur} />
      {error && <span className={styles.Error}>{helperText}</span>}
    </div>
  );
};
