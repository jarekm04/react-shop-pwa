import { useLiveQuery } from "dexie-react-hooks";
import { useCart } from "@hooks/useCart";
import { Button } from "@features/ui/Button";
import { db } from "../../../../db";
import styles from "./products.module.css";
import { ProductDocumentTypes } from "../../types/Product";

const Product = ({ product }: { product: ProductDocumentTypes }) => {
  const { cart, incrementProduct, decrementProduct } = useCart();

  let qty = 0;

  const cartDB = useLiveQuery(() => db.cart.toArray());

  const cartItem = cart.find((item) => item._id === product._id);

  if (cartItem) {
    qty = cartItem.quantity;
  }

  return (
    <div className={styles.Product}>
      <img src='https://via.placeholder.com/300.png/09f/fff' alt='image' />
      <div className={styles.Info}>
        <p>{product.price} $</p>
        {product.description && <p>{product.description}</p>}
      </div>
      <div className={styles.Actions}>
        <Button handleClick={() => decrementProduct(product)} option='tertiary'>
          -
        </Button>
        <span className={styles.Qty}>{qty}</span>
        <Button handleClick={() => incrementProduct(product)} option='tertiary'>
          +
        </Button>
      </div>
    </div>
  );
};

export default Product;
