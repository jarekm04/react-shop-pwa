import { useEffect } from "react";
import Header from "@features/products/components/Header";
import { useGeolocation } from "@hooks/useGeolocation";
import { useProducts } from "@hooks/useProducts";
import Products from "@features/products/components/Products";

const Home = () => {
  const { getProducts } = useProducts();
  // const { position, error } = useGeolocation();
  // console.log(products);

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
