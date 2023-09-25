import { ThemeProvider } from "@mui/material";
import { theme } from "@utils/theme";
import { RootProvider } from "./RootProvider";
import { ProductProvider } from "./ProductsProvider";
import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthProvider";

const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <RootProvider />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
