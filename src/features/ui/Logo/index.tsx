import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";

export const Logo = () => {
  const navigate = useNavigate();
  return <img onClick={() => navigate("/")} className={styles.Logo} src='shop-icon-cut-bg.png' alt='shop-square logo' />;
};
