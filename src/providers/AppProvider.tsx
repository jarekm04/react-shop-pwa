import { ThemeProvider } from "@mui/material";
import { theme } from "@utils/theme";
import { RootProvider } from "./RootProvider";
import { ProductProvider } from "./ProductsProvider";
import { CartProvider } from "./CartProvider";

const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProductProvider>
        <CartProvider>
          <RootProvider />
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
