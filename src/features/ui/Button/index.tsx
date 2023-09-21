import styles from "./button.module.css";

type OptionProps = "primary" | "secondary" | "tertiary" | "fourth";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "reset" | "submit";
  handleClick?: () => void;
  children: React.ReactNode;
  option?: OptionProps;
  disabled?: boolean;
}

export const Button = ({ type, handleClick, option, disabled, children }: ButtonProps) => {
  const switchOptions = (option?: OptionProps) => {
    switch (option) {
      case "primary":
        return styles.ButtonPrimary;
      case "secondary":
        return styles.ButtonSecondary;
      case "tertiary":
        return styles.ButtonTertiary;
      case "fourth":
        return styles.ButtonFourth;
      default:
        return styles.ButtonPrimary;
    }
  };

  return (
    <button type={type} className={switchOptions(option)} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
