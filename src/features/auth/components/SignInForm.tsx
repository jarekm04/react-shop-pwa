import { Box, Button, CircularProgress, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useInput } from "@hooks/useInput";
import { useAuth } from "@hooks/useAuth";
import { validateEmail, validatePassword } from "@utils/validators";
import { login } from "../slicers/authSlice";
import { SignInFooter } from "./Footer";
import * as SimpleWebAuthnBrowser from "@simplewebauthn/browser";

const SignInForm = () => {
  const [isUserExists, setIsUserExists] = useState(false);
  const [isWebAuthn, setIsWebAuthn] = useState(false);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);
  const { isLoading, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated, navigate]);

  const checkAuthOptions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/webauthn/auth-options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput.text }),
      });
      const data = await response.json();
      console.log(data);

      if (data.email) {
        setIsUserExists(true);
      }
      if (data.webauthn) {
        setIsWebAuthn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithWebAuthn = async () => {
    try {
      const options = await fetch("http://localhost:3000/api/webauthn/login-options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput.text }),
      });
      const optionsRes = await options.json();
      const loginRes = await SimpleWebAuthnBrowser.startAuthentication(optionsRes);

      const verificationRes = await fetch("http://localhost:3000/api/webauthn/login-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput.text, data: loginRes }),
      });

      const data = await verificationRes.json();

      if (verificationRes.status === 201 && data.email && data.name) {
        console.log(data);
        navigate("/"); // dodać dodawanie uytkownika poprzez takie zalogowanie // x@x.pl xxxxxx
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isUserExists) {
      checkAuthOptions();
    } else {
      const user = {
        email: emailInput.text,
        password: passwordInput.text,
      };

      dispatch(login(user));
      navigate("/");
    }
  };

  if (isLoading) return <CircularProgress sx={{ marginTop: "64px", color: "primary" }} />;

  return (
    <>
      <Box sx={{ border: 1, padding: 2, borderColor: "#cccccc", width: "350px", marginTop: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container direction='column' justifyContent='flex-start'>
            <Typography variant='h4' component='h1'>
              Sign-In
            </Typography>

            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor='email'>
              Email
            </InputLabel>
            <TextField
              type='email'
              name='email'
              id='email'
              variant='outlined'
              size='small'
              value={emailInput.text}
              onChange={emailInput.textChangeHandler}
              onBlur={emailInput.inputBlurHandler}
              error={emailInput.shouldDisplayError}
              helperText={emailInput.shouldDisplayError ? "Enter your email" : ""}
            />

            {isUserExists && (
              <>
                <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor='password'>
                  Password
                </InputLabel>
                <TextField
                  type='password'
                  name='password'
                  id='password'
                  variant='outlined'
                  size='small'
                  placeholder='Minimum 6 characters required'
                  value={passwordInput.text}
                  onChange={passwordInput.textChangeHandler}
                  onBlur={passwordInput.inputBlurHandler}
                  error={passwordInput.shouldDisplayError}
                  helperText={passwordInput.shouldDisplayError ? "Enter your password. Min. 6 characters" : ""}
                />
              </>
            )}

            {isWebAuthn && <Button onClick={signInWithWebAuthn}>Sign In with WebAuthn / Passkey</Button>}

            <Button
              id='signin-btn'
              type='submit'
              variant='contained'
              style={{
                marginTop: "16px",
                height: "31px",
                borderColor: "#a88734 #9c7e31 #846a29",
                textTransform: "none",
              }}
              // disabled={!emailInput.text.length || !passwordInput.text.length || passwordInput.text.length < 6}
            >
              Sign-In
            </Button>
          </Grid>
        </form>

        <div style={{ marginTop: "30px" }}>
          <small>
            <span>By continuing, you agree to Shop Square's</span>
          </small>
        </div>
        <div>
          <small>
            <a href='#' style={{ textDecoration: "none" }}>
              {" "}
              Conditions of use
            </a>{" "}
            and{" "}
            <a href='#' style={{ textDecoration: "none" }}>
              Privacy policy
            </a>
          </small>
        </div>
      </Box>

      <SignInFooter />
    </>
  );
};

export default SignInForm;
