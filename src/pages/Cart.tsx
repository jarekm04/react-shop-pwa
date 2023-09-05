import Header from "@features/products/components/Header";
import List from "@features/cart/components/List";
import Summary from "@features/cart/components/Summary";

const Cart = () => {
  return (
    <div>
      <Header />
      <List />
      <Summary />
    </div>
  );
};

export default Cart;
