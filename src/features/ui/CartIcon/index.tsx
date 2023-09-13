import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge from "./Badge";
import styles from "./cartIcon.module.css";

const CartIcon = ({ cartCount }: { cartCount: number }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.CartIcon} onClick={() => navigate("/cart")}>
      <AiOutlineShoppingCart className={styles.Icon} />
      <Badge count={cartCount} />
      <span>Cart</span>
    </div>
  );
};

export default CartIcon;
