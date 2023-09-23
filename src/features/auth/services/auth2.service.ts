import axios from "axios";
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

export const register = async ({ dispatch, value }: { dispatch: (type: RegisterAction) => void; value: NewUserTypes}) => {
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

export const login = async (dispatch: (value: LoginAction) => void) => {
  dispatch({ type: authActions.LOGIN_PENDING });

  try {
    const response = await axios.get<LoginUserTypes>(`${import.meta.env.VITE_API_HOST}/auth/login`);
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

export const verifyJwt = async (dispatch: (value: VerifyJwtAction) => void) => {
  dispatch({ type: authActions.VERIFYJWT_PENDING });

  try {
    const response = await axios.get<string>(`${import.meta.env.VITE_API_HOST}/auth/verify-jwt`);
    dispatch({ type: authActions.VERIFYJWT_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.VERIFYJWT_REJECTED });
    throw new Error("Unable to verify!");
  }
};

export const addWebAuthnOptions = async (dispatch: (value: AddWebAuthnOptions) => void) => {
  dispatch({ type: authActions.ADDWEBAUTHNOPTIONS_PENDING });

  try {
    const response = await axios.get<DisplayUserTypes>(
      `${import.meta.env.VITE_API_HOST}/webauthn/registration-options`
    );
    // "http://localhost:3000/api/webauthn/registration-verification"
    dispatch({ type: authActions.ADDWEBAUTHNOPTIONS_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.ADDWEBAUTHNOPTIONS_REJECTED });
    throw new Error("Unable to add WebAuthn Options!");
  }
};

export const checkAuthOptions = async (dispatch: (value: CheckAuthOptionsAction) => void) => {
  dispatch({ type: authActions.CHECKAUTHOPTIONS_PENDING });

  try {
    const response = await axios.get<string>(`${import.meta.env.VITE_API_HOST}/webauthn/auth-options`);
    dispatch({ type: authActions.CHECKAUTHOPTIONS_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.CHECKAUTHOPTIONS_REJECTED });
    throw new Error("Unable to check WebAuthn Options!");
  }
};

export const signInWithWebAuthn = async (dispatch: (value: SignInWithWebAuthnAction) => void) => {
  dispatch({ type: authActions.SIGNINWITHWEBAUTHN_PENDING });

  try {
    const response = await axios.get<string>(`${import.meta.env.VITE_API_HOST}/webauthn/login-options`);
    // await axios.post(`${import.meta.env.VITE_API_HOST}/webauthn/login-verification`, {
    dispatch({ type: authActions.SIGNINWITHWEBAUTHN_FULFILLED, payload: response });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: authActions.SIGNINWITHWEBAUTHN_REJECTED });
    throw new Error("Unable to sign in with WebAuthn!");
  }
};
