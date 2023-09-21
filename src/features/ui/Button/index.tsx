import styles from "./button.module.css";

type OptionProps = "primary" | "secondary";

interface ButtonProps {
  handleClick: () => void;
  children: React.ReactNode;
  option?: OptionProps;
}

const Button = ({ handleClick, option, children }: ButtonProps) => {
  const switchOptions = (option?: OptionProps) => {
    switch (option) {
      case "primary":
        return styles.ButtonPrimary;
      case "secondary":
        return styles.ButtonSecondary;
      default:
        return styles.ButtonPrimary;
    }
  };

  return (
    <button className={switchOptions(option)} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
