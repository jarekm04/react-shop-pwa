import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useInput } from "@hooks/useInput";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@features/ui/Button";
import { Label } from "@features/ui/Label";
import { Input } from "@features/ui/Input";
import { checkAuthOptions, login as loginREDUX, signInWithWebAuthn } from "../../slicers/authSlice";
import { validateEmail, validatePassword } from "@utils/validators";
import styles from "./signInForm.module.css";
import { useAuth2 } from "@hooks/useAuth2";

const SignInForm = () => {
  const [isUserExists, setIsUserExists] = useState(false);
  const [isWebAuthn, setIsWebAuthn] = useState(false);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);
  const { isAuthenticated, userEmail, userHasWebAuthn } = useAuth();
  const { login } = useAuth2();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userEmail) setIsUserExists(true);
    if (userHasWebAuthn) setIsWebAuthn(true);
  }, [userEmail, userHasWebAuthn]);

  const handleCheckAuthOptions = async () => {
    dispatch(checkAuthOptions(emailInput.text));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isUserExists) {
      handleCheckAuthOptions();
    } else {
      const user = {
        email: emailInput.text,
        password: passwordInput.text,
      };

      dispatch(loginREDUX(user));
      login(user);
      navigate("/");
    }
  };

  return (
    <div className={styles.Wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.Container}>
          <h1 className={styles.Headline}>Sign-In</h1>

          <div className={styles.Box}>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={emailInput.text}
              handleChange={emailInput.textChangeHandler}
              handleBlur={emailInput.inputBlurHandler}
              error={emailInput.shouldDisplayError}
              helperText='Enter your email'
            />
          </div>

          {isUserExists && (
            <div className={styles.Box}>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={passwordInput.text}
                handleChange={passwordInput.textChangeHandler}
                handleBlur={passwordInput.inputBlurHandler}
                error={passwordInput.shouldDisplayError}
                helperText='"Enter your password. Min. 6 characters'
              />
            </div>
          )}

          {isWebAuthn && (
            <div className={styles.WebAuthn}>
              <Button handleClick={() => dispatch(signInWithWebAuthn(emailInput.text))} option='secondary'>
                Sign In with WebAuthn / Passkey
              </Button>
            </div>
          )}

          <div className={styles.BtnWrapper}>
            <Button
              type='submit'
              option='tertiary'
              // disabled={!emailInput.text.length || !passwordInput.text.length || passwordInput.text.length < 6}
            >
              Sign-In
            </Button>
          </div>
        </div>
      </form>

      <div className={styles.Conditions}>
        By continuing, you agree to Shop Square's{" "}
        <Link to='#' className={styles.Link}>
          Conditions of use
        </Link>{" "}
        and{" "}
        <Link to='#' className={styles.Link}>
          Privacy policy
        </Link>
        .
      </div>
    </div>
  );
};

export default SignInForm;
