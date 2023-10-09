import { useEffect } from "react";
import Header from "@features/products/components/Header";
import { useProducts } from "@hooks/useProducts";
import Products from "@features/products/components/Products";

const Home = () => {
  const { getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <Products />
    </div>
  );
};

export default Home;
