import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useAuth } from "@hooks/useAuth";
import { useProduct } from "@hooks/useProduct";
import { logout } from "@features/auth/slicers/authSlice";
import * as SimpleWebAuthnBrowser from "@simplewebauthn/browser";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();
  const { cart } = useProduct();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log(user);

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
  }, [cart]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const addWebAuthnOptions = async () => {
    try {
      const registrationRes = await fetch("http://localhost:3000/api/webauthn/registration-options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const options = await registrationRes.json();
      options.authenticatorSelection.residentKey = "required";
      options.authenticatorSelection.requireResidentKey = true;
      options.extensions = {
        credProps: true,
      };

      const authRes = await SimpleWebAuthnBrowser.startRegistration(options);

      const verificationRes = await fetch("http://localhost:3000/api/webauthn/registration-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, data: authRes }),
      });

      const data = await verificationRes.json();

      if (verificationRes.ok) {
        alert("You can now login using the new registered method!");
      } else {
        alert("Oops something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
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
            <Button onClick={addWebAuthnOptions}>Add Authenticator / Passkey</Button>
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
