import { Box, Button, CircularProgress, Divider, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { useInput } from "@hooks/useInput";
import { useAuth } from "@hooks/useAuth";
import { validateEmail, validateName, validatePassword } from "@utils/validators";
import { register, reset } from "../slicers/authSlice";
import { NewUserTypes } from "../models/NewUser";

const RegistrationForm = () => {
  const nameInput = useInput(validateName);
  const emailInput = useInput(validateEmail);
  const passwordInput = useInput(validatePassword);
  const confirmPasswordInput = useInput(validatePassword);
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();
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

    dispatch(register(newUser));
    dispatch(reset());
    clearForm();
    navigate("/signin");
  };

  if (isLoading) return <CircularProgress sx={{ marginTop: "64px" }} color='primary' />;

  return (
    <Box sx={{ border: 1, padding: 2, borderColor: "#cccccc", width: "350px", marginTop: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column' justifyContent='flex-start'>
          <Typography variant='h4' component='h1'>
            Create Account
          </Typography>

          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor='name'>
            Your name
          </InputLabel>
          <TextField
            type='text'
            name='name'
            id='name'
            variant='outlined'
            size='small'
            value={nameInput.text}
            onChange={nameInput.textChangeHandler}
            onBlur={nameInput.inputBlurHandler}
            error={nameInput.shouldDisplayError}
            helperText={nameInput.shouldDisplayError ? "Enter your name" : ""}
          />

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

          <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }} htmlFor='confirmPassword'>
            Confirm password
          </InputLabel>
          <TextField
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            variant='outlined'
            size='small'
            value={confirmPasswordInput.text}
            onChange={confirmPasswordInput.textChangeHandler}
            onBlur={confirmPasswordInput.inputBlurHandler}
            error={confirmPasswordInput.text.length > 0 && passwordInput.text !== confirmPasswordInput.text}
            helperText={
              confirmPasswordInput.text.length > 0 && passwordInput.text !== confirmPasswordInput.text
                ? "Confirm your password. Passwords should match"
                : ""
            }
          />

          <Button
            id='register-btn'
            type='submit'
            variant='contained'
            style={{
              marginTop: "16px",
              height: "31px",
              // backgroundColor: "#f0c14b",
              // color: "black",
              borderColor: "#a88734 #9c7e31 #846a29",
              textTransform: "none",
            }}
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
        </Grid>
      </form>

      <div style={{ marginTop: "30px" }}>
        <small>
          <span>By creating an account, you agree to Shop Square's</span>
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

      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />

      <div style={{ marginTop: "30px" }}>
        <small>
          Already have an account?{" "}
          <Link id='register-link' to='/signin' style={{ textDecoration: "none", color: "#0000ee" }}>
            Sign-in
          </Link>
        </small>
      </div>

      <div>
        <small>
          Buying for work?
          <a href='#' style={{ textDecoration: "none" }}>
            {" "}
            Create a free bussiness account
          </a>
        </small>
      </div>
    </Box>
  );
};

export default RegistrationForm;
