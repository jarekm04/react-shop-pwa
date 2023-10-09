import { createContext, useReducer } from "react";
import { JwtTypes } from "@features/auth/types/Jwt";
import { DisplayUserTypes } from "@features/auth/types/DisplayUser";
import { AuthStateTypes } from "@features/auth/types/AuthState";
import {
  addWebAuthnOptions,
  checkAuthOptions,
  login,
  logout,
  register,
  signInWithWebAuthn,
  verifyJwt,
} from "@features/auth/services/auth.service";
import { authActions } from "@features/auth/services/auth.actions";
import { AuthAction } from "@features/auth/types/AuthActions";
import { NewUserTypes } from "@features/auth/types/NewUser";
import { LoginUserTypes } from "@features/auth/types/LoginUser";

const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUserTypes | null = storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: JwtTypes = storedJwt ? JSON.parse(storedJwt) : null;

const initialState: AuthStateTypes = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  userEmail: "",
  userHasWebAuthn: false,
  register: () => null,
  login: () => null,
  logout: () => null,
  verifyJwt: () => null,
  addWebAuthnOptions: () => null,
  checkAuthOptions: () => null,
  signInWithWebAuthn: () => null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state: AuthStateTypes, action: AuthAction) => {
  switch (action.type) {
    case authActions.REGISTER_PENDING:
    case authActions.LOGIN_PENDING:
    case authActions.VERIFYJWT_PENDING:
    case authActions.ADDWEBAUTHNOPTIONS_PENDING:
    case authActions.SIGNINWITHWEBAUTHN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    // REGISTER
    case authActions.REGISTER_FULFILLED:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        user: action.payload.data,
      };
    case authActions.REGISTER_REJECTED:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        user: null,
      };
    // LOGIN
    case authActions.LOGIN_FULFILLED:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        user: action.payload.data.user,
        jwt: action.payload.data.jwt,
        isAuthenticated: true,
      };
    case authActions.LOGIN_REJECTED:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        jwt: null,
        user: null,
        isAuthenticated: false,
      };
    // LOGOUT
    case authActions.LOGOUT_FULFILLED:
      return {
        ...state,
        user: null,
        jwt: null,
        isAuthenticated: false,
        userEmail: "",
        userHasWebAuthn: false,
      };
    // VERIFY JWT
    case authActions.VERIFYJWT_FULFILLED:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        isAuthenticated: action.payload.data,
      };
    case authActions.VERIFYJWT_REJECTED:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
        isAuthenticated: false,
      };
    // ADD WEBAUTHN OPTIONS
    case authActions.ADDWEBAUTHNOPTIONS_FULFILLED:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case authActions.ADDWEBAUTHNOPTIONS_REJECTED:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: true,
      };
    // WEBAUTHN CHECK OPTIONS
    case authActions.CHECKAUTHOPTIONS_FULFILLED:
      return {
        ...state,
        userEmail: action.payload.data.email,
        userHasWebAuthn: action.payload.data.webauthn,
      };
    case authActions.CHECKAUTHOPTIONS_REJECTED:
      return {
        ...state,
        userEmail: "",
        userHasWebAuthn: false,
      };
    // WEBAUTHN LOGIN
    case authActions.SIGNINWITHWEBAUTHN_FULFILLED:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case authActions.SIGNINWITHWEBAUTHN_REJECTED:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const contextValue = {
    user: state.user,
    jwt: state.jwt,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    userEmail: state.userEmail,
    userHasWebAuthn: state.userHasWebAuthn,
    register: (newUser: NewUserTypes) => register({ dispatch, newUser }),
    login: (user: LoginUserTypes) => login({ dispatch, user }),
    logout: () => logout(dispatch),
    verifyJwt: (jwt: string) => verifyJwt({ dispatch, jwt }),
    addWebAuthnOptions: (user: DisplayUserTypes) => addWebAuthnOptions({ dispatch, user }),
    checkAuthOptions: (email: string) => checkAuthOptions({ dispatch, email }),
    signInWithWebAuthn: (email: string) => signInWithWebAuthn({ dispatch, email }),
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
