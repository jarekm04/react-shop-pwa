import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export const RegistrationFooter = () => {
  return (
    <>
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
    </>
  );
};

export const SignInFooter = () => {
  return (
    <div style={{ marginTop: "16px" }}>
      <Divider>
        <small style={{ color: "#767676" }}>New to Shop Square?</small>
      </Divider>
      <Link id='register-link' to='/register' style={{ textDecoration: "none", color: "#0000ee" }}>
        <Button
          variant='contained'
          style={{
            width: "100%",
            marginTop: "12px",
            height: "31px",
            backgroundColor: "#f1f1f1",
            color: "black",
            textTransform: "none",
          }}
        >
          Register
        </Button>
      </Link>
    </div>
  );
};
