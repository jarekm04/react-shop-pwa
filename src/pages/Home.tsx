import { useEffect } from "react";
import Header from "@features/products/components/Header";
import Product from "@features/products/components/Product";
import { useGeolocation } from "@hooks/useGeolocation";
import { useProducts } from "@hooks/useProducts";

const Home = () => {
  const { getProducts, products } = useProducts();
  // const { position, error } = useGeolocation();
  // console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "48px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "48px",
        }}
      >
        {products.length > 0 && products.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default Home;
