import { useNavigate } from "react-router-dom";
import { useInput } from "@hooks/useInput";
import { useAuth } from "@hooks/useAuth";
import { Label } from "@features/ui/Label";
import { Input } from "@features/ui/Input";
import { Button } from "@features/ui/Button";
import { validateEmail, validateName, validatePassword } from "@utils/validators";
import styles from "./registrationForm.module.css";
import { NewUserTypes } from "../../types/NewUser";

const RegistrationForm = () => {
  const { register } = useAuth();
  const nameInput = useInput(validateName);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);
  const confirmPasswordInput = useInput(validatePassword);
  const navigate = useNavigate();

  const clearForm = () => {
    nameInput.clearHandler();
    emailInput.clearHandler();
    passwordInput.clearHandler();
    confirmPasswordInput.clearHandler();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: NewUserTypes = {
      name: nameInput.text,
      email: emailInput.text,
      password: passwordInput.text,
    };

    register(newUser);
    clearForm();
    navigate("/signin");
  };

  return (
    <div className={styles.Wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.Container}>
          <h1 className={styles.Headline}>Create Account</h1>

          <div className={styles.Box}>
            <Label htmlFor='name'>Your name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              value={nameInput.text}
              handleChange={nameInput.textChangeHandler}
              handleBlur={nameInput.inputBlurHandler}
              error={nameInput.shouldDisplayError}
              helperText='Enter your name'
            />
          </div>

          <div className={styles.Box}>
            <Label htmlFor='name'>Email</Label>
            <Input
              type='email'
              name='email'
              id='name'
              value={emailInput.text}
              handleChange={emailInput.textChangeHandler}
              handleBlur={emailInput.inputBlurHandler}
              error={emailInput.shouldDisplayError}
              helperText='Enter your email'
            />
          </div>

          <div className={styles.Box}>
            <Label htmlFor='name'>Password</Label>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Minimum 6 characters required'
              value={passwordInput.text}
              handleChange={passwordInput.textChangeHandler}
              handleBlur={passwordInput.inputBlurHandler}
              error={passwordInput.shouldDisplayError}
              helperText='Enter your password. Min. 6 characters'
            />
          </div>

          <div className={styles.Box}>
            <Label htmlFor='name'>Confirm password</Label>
            <Input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              value={confirmPasswordInput.text}
              handleChange={confirmPasswordInput.textChangeHandler}
              handleBlur={confirmPasswordInput.inputBlurHandler}
              error={confirmPasswordInput.text.length > 0 && passwordInput.text !== confirmPasswordInput.text}
              helperText='Confirm your password. Passwords should match'
            />
          </div>

          <div className={styles.BtnWrapper}>
            <Button
              type='submit'
              option='tertiary'
              disabled={
                !nameInput.text.length ||
                !emailInput.text.length ||
                !passwordInput.text.length ||
                !confirmPasswordInput.text.length ||
                passwordInput.text !== confirmPasswordInput.text ||
                passwordInput.text.length < 6 ||
                confirmPasswordInput.text.length < 6
              }
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
