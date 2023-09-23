import { createContext, useReducer } from "react";
import { JwtTypes } from "@features/auth/types/Jwt";
import { DisplayUserTypes } from "@features/auth/types/DisplayUser";
import { AuthStateTypes } from "@features/auth/types/AuthState";
import { addWebAuthnOptions, checkAuthOptions, login, logout, register, signInWithWebAuthn, verifyJwt } from "@features/auth/services/auth2.service";

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
    register: (newUser) => register({ dispatch, newUser }),
    login: (user) => login({ dispatch, user }),
    logout: () => logout(dispatch),
    verifyJwt: (jwt) => verifyJwt({ dispatch, jwt }),
    addWebAuthnOptions: (user) => addWebAuthnOptions({ dispatch, user }),
    checkAuthOptions: (email) => checkAuthOptions({ dispatch, email }),
    signInWithWebAuthn: (email) => signInWithWebAuthn({ dispatch, email }),
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
