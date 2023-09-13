import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useAuth } from "@hooks/useAuth";
import { addWebAuthnOptions, logout } from "@features/auth/slicers/authSlice";
import { DisplayUserTypes } from "@features/auth/types/DisplayUser";
import { useCart } from "@hooks/useCart";
import Button2 from "@features/ui/Button";
import CartIcon from "@features/ui/CartIcon";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();
  const { cart } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
  }, [cart]);

  const handleAddWebAuthnOptions = (user?: DisplayUserTypes | null) => {
    if (user) {
      dispatch(addWebAuthnOptions(user));
    } else return;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: "#131921", color: "white", padding: "10px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            onClick={() => navigate("/")}
            style={{
              width: "50px",
              height: "50px",
              paddingTop: "10px",
              cursor: "pointer",
            }}
            src='shop-icon-cut-bg.png'
            alt='shop-square logo'
          />
          <div style={{ display: "flex", gap: "20px" }}>
            <Button onClick={() => handleAddWebAuthnOptions(user)}>Add Authenticator / Passkey</Button>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <div>Hello, {user?.name}</div>
              <Button2 handleClick={handleLogout}>Sign out</Button2>
            </div>
            <CartIcon cartCount={cartCount} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
