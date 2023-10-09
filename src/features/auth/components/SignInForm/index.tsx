import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "@hooks/useInput";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@features/ui/Button";
import { Label } from "@features/ui/Label";
import { Input } from "@features/ui/Input";
import { validateEmail, validatePassword } from "@utils/validators";
import styles from "./signInForm.module.css";

const SignInForm = () => {
  const { login, isAuthenticated, checkAuthOptions, userEmail, userHasWebAuthn, signInWithWebAuthn } = useAuth();
  const [isUserExists, setIsUserExists] = useState(false);
  const [isWebAuthn, setIsWebAuthn] = useState(false);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);
  const navigate = useNavigate();

  const checkWebAuthPossibility = !isWebAuthn
    ? false
    : !emailInput.text.length || !passwordInput.text.length || passwordInput.text.length < 6;

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userEmail) setIsUserExists(true);
    if (userHasWebAuthn) setIsWebAuthn(true);
  }, [userEmail, userHasWebAuthn]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isUserExists) {
      checkAuthOptions(emailInput.text);
    } else {
      const user = {
        email: emailInput.text,
        password: passwordInput.text,
      };

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
              <div onClick={() => signInWithWebAuthn(emailInput.text)}>Sign In with WebAuthn / Passkey</div>
            </div>
          )}

          <div className={styles.BtnWrapper}>
            <Button type='submit' option='tertiary' disabled={checkWebAuthPossibility}>
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
