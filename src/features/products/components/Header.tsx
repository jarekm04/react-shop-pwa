import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useAuth } from "@hooks/useAuth";
import { useProduct } from "@hooks/useProduct";
import { logout } from "@features/auth/slicers/authSlice";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();
  const { cart } = useProduct();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
  }, [cart]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: "#131921", color: "white", padding: "10px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            onClick={() => navigate("/")}
            style={{
              width: "150px",
              height: "50px",
              paddingTop: "10px",
              cursor: "pointer",
            }}
            src='shop-logo-light.png'
            alt='shop-square logo'
          />
          <div style={{ display: "flex" }}>
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
