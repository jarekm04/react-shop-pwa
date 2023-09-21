import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useAuth } from "@hooks/useAuth";
import { useCart } from "@hooks/useCart";
import { addWebAuthnOptions, logout } from "@features/auth/slicers/authSlice";
import { DisplayUserTypes } from "@features/auth/types/DisplayUser";
import Button from "@features/ui/Button";
import CartIcon from "@features/ui/CartIcon";
import Logo from "@features/ui/Logo";
import styles from "./header.module.css";

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
    <header className={styles.Header}>
      <Logo />
      <section className={styles.Panel}>
        <Button handleClick={() => handleAddWebAuthnOptions(user)} option='secondary'>
          Add Authenticator / Passkey
        </Button>
        <div className={styles.User}>
          <span>Hello, {user?.name}</span>
          <Button handleClick={handleLogout}>Sign out</Button>
        </div>
        <CartIcon cartCount={cartCount} />
      </section>
    </header>
  );
};

export default Header;
