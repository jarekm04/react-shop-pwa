import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@hooks/useCart";
import { useAuth } from "@hooks/useAuth";
import { DisplayUserTypes } from "@features/auth/types/DisplayUser";
import { Button } from "@features/ui/Button";
import { CartIcon } from "@features/ui/CartIcon";
import { Logo } from "@features/ui/Logo";
import styles from "./header.module.css";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout, addWebAuthnOptions } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
  }, [cart]);

  const handleAddWebAuthnOptions = (user?: DisplayUserTypes | null) => {
    if (user) {
      addWebAuthnOptions(user);
    } else return;
  };

  const handleLogout = () => {
    logout();
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
