import { useProducts } from "@hooks/useProducts";
import Product from "./Product";
import styles from "./products.module.css";

const Products = () => {
  const { products } = useProducts();

  return (
    <div className={styles.Products}>
      {products.length > 0 && products.map((product) => <Product key={product._id} product={product} />)}
    </div>
  );
};

export default Products;
