import { useEffect } from "react";
import Header from "@features/products/components/Header";
import Product from "@features/products/components/Product";
import { useGeolocation } from "@hooks/useGeolocation";
import { useProductContext } from "../providers/ProductsProvider";

const Home = () => {
  const { products } = useProductContext();
  // const { position, error } = useGeolocation();
  console.log(products);

  // console.log(position);
  // console.log(error);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

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
        {/* {products.length > 0 && products.map((product) => <Product key={product._id} product={product} />)} */}
      </div>
    </div>
  );
};

export default Home;
