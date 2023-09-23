import axios from "axios";
import jwt_decode from "jwt-decode";
import * as SimpleWebAuthnBrowser from "@simplewebauthn/browser";
import { NewUserTypes } from "../types/NewUser";
import { LoginUserTypes } from "../types/LoginUser";
import { DisplayUserTypes } from "../types/DisplayUser";
import {
  AddWebAuthnOptions,
  AuthActionsTypes,
  CheckAuthOptionsAction,
  LoginAction,
  LogoutAction,
  RegisterAction,
  SignInWithWebAuthnAction,
  VerifyJwtAction,
} from "../types/AuthActions";

export const authActions: AuthActionsTypes = {
  REGISTER_PENDING: "REGISTER_PENDING",
  REGISTER_FULFILLED: "REGISTER_FULFILLED",
  REGISTER_REJECTED: "REGISTER_REJECTED",
  LOGIN_PENDING: "LOGIN_PENDING",
  LOGIN_FULFILLED: "LOGIN_FULFILLED",
  LOGIN_REJECTED: "LOGIN_REJECTED",
  LOGOUT_PENDING: "LOGOUT_PENDING",
  LOGOUT_FULFILLED: "LOGOUT_FULFILLED",
  LOGOUT_REJECTED: "LOGOUT_REJECTED",
  VERIFYJWT_PENDING: "VERIFYJWT_PENDING",
  VERIFYJWT_FULFILLED: "VERIFYJWT_FULFILLED",
  VERIFYJWT_REJECTED: "VERIFYJWT_REJECTED",
  ADDWEBAUTHNOPTIONS_PENDING: "ADDWEBAUTHNOPTIONS_PENDING",
  ADDWEBAUTHNOPTIONS_FULFILLED: "ADDWEBAUTHNOPTIONS_FULFILLED",
  ADDWEBAUTHNOPTIONS_REJECTED: "ADDWEBAUTHNOPTIONS_REJECTED",
  CHECKAUTHOPTIONS_PENDING: "CHECKAUTHOPTIONS_PENDING",
  CHECKAUTHOPTIONS_FULFILLED: "CHECKAUTHOPTIONS_FULFILLED",
  CHECKAUTHOPTIONS_REJECTED: "CHECKAUTHOPTIONS_REJECTED",
  SIGNINWITHWEBAUTHN_PENDING: "SIGNINWITHWEBAUTHN_PENDING",
  SIGNINWITHWEBAUTHN_FULFILLED: "SIGNINWITHWEBAUTHN_FULFILLED",
  SIGNINWITHWEBAUTHN_REJECTED: "SIGNINWITHWEBAUTHN_REJECTED",
};

export const register = async ({
  dispatch,
  newUser,
}: {
  dispatch: (type: RegisterAction) => void;
  newUser: NewUserTypes;
}) => {
  dispatch({ type: authActions.REGISTER_PENDING });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/register`, newUser);
    dispatch({ type: authActions.REGISTER_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.REGISTER_REJECTED });
    throw new Error("Unable to login!");
  }
};

export const login = async ({ dispatch, user }: { dispatch: (value: LoginAction) => void; user: LoginUserTypes }) => {
  dispatch({ type: authActions.LOGIN_PENDING });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/login`, user);
    dispatch({ type: authActions.LOGIN_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.LOGIN_REJECTED });
    throw new Error("Unable to login!");
  }
};

export const logout = async (dispatch: (value: LogoutAction) => void) => {
  dispatch({ type: authActions.LOGOUT_PENDING });

  try {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    dispatch({ type: authActions.LOGOUT_FULFILLED });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.LOGOUT_REJECTED });
    throw new Error("Unable to logout!");
  }
};

export const verifyJwt = async ({ dispatch, jwt }: { dispatch: (value: VerifyJwtAction) => void; jwt: string }) => {
  dispatch({ type: authActions.VERIFYJWT_PENDING });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/verify-jwt`, { jwt });

    if (!response.data) return false;

    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();

    dispatch({ type: authActions.VERIFYJWT_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.VERIFYJWT_REJECTED });
    throw new Error("Unable to verify!");
  }
};

export const addWebAuthnOptions = async ({
  dispatch,
  user,
}: {
  dispatch: (value: AddWebAuthnOptions) => void;
  user: DisplayUserTypes;
}) => {
  dispatch({ type: authActions.ADDWEBAUTHNOPTIONS_PENDING });

  const registrationRes = await fetch(`${import.meta.env.VITE_API_HOST}/webauthn/registration-options`, {
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

  const verificationRes = await fetch(`${import.meta.env.VITE_API_HOST}/webauthn/registration-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, data: authRes }),
  });

  const data = await verificationRes.json();

  if (verificationRes.ok) {
    dispatch({ type: authActions.ADDWEBAUTHNOPTIONS_FULFILLED, payload: data });
    alert("You can now login using the new registered method!");
  } else {
    dispatch({ type: authActions.ADDWEBAUTHNOPTIONS_REJECTED });
    alert("Oops something went wrong!");
    throw new Error("Unable to add WebAuthn Options!");
  }
};

export const checkAuthOptions = async ({
  dispatch,
  email,
}: {
  dispatch: (value: CheckAuthOptionsAction) => void;
  email: string;
}) => {
  dispatch({ type: authActions.CHECKAUTHOPTIONS_PENDING });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_HOST}/webauthn/auth-options`, {
      email,
    });
    const data = response.data;
    dispatch({ type: authActions.CHECKAUTHOPTIONS_FULFILLED, payload: response });
    return data;
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.CHECKAUTHOPTIONS_REJECTED });
    throw new Error("Unable to check WebAuthn Options!");
  }
};

export const signInWithWebAuthn = async ({
  dispatch,
  email,
}: {
  dispatch: (value: SignInWithWebAuthnAction) => void;
  email: string;
}) => {
  dispatch({ type: authActions.SIGNINWITHWEBAUTHN_PENDING });

  const optionsResponse = await axios.post(`${import.meta.env.VITE_API_HOST}/webauthn/login-options`, {
    email: email,
  });

  const optionsRes = optionsResponse.data;
  const loginRes = await SimpleWebAuthnBrowser.startAuthentication(optionsRes);

  try {
    const verificationResponse = await axios.post(`${import.meta.env.VITE_API_HOST}/webauthn/login-verification`, {
      email: email,
      data: loginRes,
    });

    const data = verificationResponse.data;

    if (data !== undefined || data !== null) {
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: authActions.SIGNINWITHWEBAUTHN_FULFILLED, payload: data });
      return data;
    } else {
      return null;
    }
  } catch (error) {
    dispatch({ type: authActions.SIGNINWITHWEBAUTHN_REJECTED });
    alert("Wrong credentials");
    throw new Error("Unable to sign in with WebAuthn!");
  }
};
