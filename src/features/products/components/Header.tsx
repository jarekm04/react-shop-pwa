import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useAuth } from "@hooks/useAuth";
import { useProduct } from "@hooks/useProduct";
import { addWebAuthnOptions, logout } from "@features/auth/slicers/authSlice";
import { DisplayUserTypes } from "@features/auth/models/DisplayUser";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();
  // const { cart } = useProduct();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  //   setCartCount(() => totalQty);
  // }, [cart]);

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
            <div>
              <div>Hello, {user?.name}</div>
              <Button onClick={handleLogout} sx={{ padding: 0, marginRight: "16px" }} color='inherit'>
                Sign out
              </Button>
            </div>
            <Button onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color='primary'>
                <ShoppingCartOutlinedIcon fontSize='large' />
              </Badge>
              <span>Cart</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
