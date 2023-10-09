import { RootProvider } from "./RootProvider";
import { ProductProvider } from "./ProductsProvider";
import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthProvider";

const AppProvider = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RootProvider />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default AppProvider;
