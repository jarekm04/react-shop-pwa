import { useCart } from "@hooks/useCart";
import { CartItemTypes } from "@features/cart/types/Cart";
import styles from "./list.module.css";

const Item = ({ name, price, quantity }: CartItemTypes) => {
  return (
    <div className={styles.Item}>
      <img width='64' height='64' src='https://placehold.co/64x64' alt='shopping-item' />
      <div>
        <p>{name}</p>
        <p>{`Quantity: ${quantity}`}</p>
        <p>{`Total price: ${(price * quantity).toFixed(2)} zł`}</p>
      </div>
    </div>
  );
};

const List = () => {
  const { cart } = useCart();

  return (
    <div className={styles.List}>
      {cart.length > 0 && cart.map((item) => <Item key={item._id} {...item} />)}
    </div>
  );
};

export default List;
