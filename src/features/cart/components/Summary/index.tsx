import { useCart } from "@hooks/useCart";
import styles from "./summary.module.css";

const Summary = () => {
  const { cart, resetCart } = useCart();

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className={styles.Container}>
      <hr className={styles.Hr} />
      <button onClick={() => resetCart()}>Wyczyść koszyk</button>
      <div className={styles.Summary}>
        <span className={styles.Subtotal}>Subtotal ({totalQty}) items:</span>
        <span className={styles.TotalPrice}>{totalPrice.toFixed(2)} zł</span>
      </div>
    </div>
  );
};

export default Summary;
