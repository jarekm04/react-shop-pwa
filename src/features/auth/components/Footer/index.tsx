import { Link } from "react-router-dom";
import { Button } from "@features/ui/Button";
import { Divider } from "@features/ui/Divider";
import styles from "./footer.module.css";

export const RegistrationFooter = () => {
  return (
    <div className={styles.RegistrationFooter}>
      <small>By creating an account, you agree to Shop Square's</small>
      <div className={styles.Conditions}>
        <Link to='#' className={styles.Link}>
          Conditions of use
        </Link>{" "}
        and{" "}
        <Link to='#' className={styles.Link}>
          Privacy policy
        </Link>
      </div>
      <Divider />
      <div className={styles.Links}>
        <small>
          Already have an account?{" "}
          <Link id='register-link' to='/signin' style={{ textDecoration: "none", color: "#0000ee" }}>
            Sign-in
          </Link>
        </small>
        <small>
          Buying for work?
          <Link to='#' className={styles.Link}>
            {" "}
            Create a free bussiness account
          </Link>
        </small>
      </div>
    </div>
  );
};

export const SignInFooter = () => {
  return (
    <div className={styles.SignInFooter}>
      <Divider>New to Shop Square?</Divider>
      <Link to='/register'>
        <Button option='fourth'>Register</Button>
      </Link>
    </div>
  );
};
