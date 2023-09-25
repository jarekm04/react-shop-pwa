import axios from "axios";
import jwt_decode from "jwt-decode";
import { DisplayUserTypes } from "../types/DisplayUser";
import { NewUserTypes } from "../types/NewUser";
import { LoginUserTypes } from "../types/LoginUser";
import { DecodedJwtTypes, JwtTypes } from "../types/Jwt";
import * as SimpleWebAuthnBrowser from "@simplewebauthn/browser";

const register = async (newUser: NewUserTypes): Promise<DisplayUserTypes | null> => {
  const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/register`, newUser);
  return response.data;
};

const login = async (user: LoginUserTypes): Promise<{ jwt: JwtTypes; user: DisplayUserTypes | null }> => {
  console.log(user);
  const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/login`, user);

  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodedJwt: DecodedJwtTypes = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return { jwt: response.data, user: decodedJwt.user };
  } else {
    return { jwt: response.data, user: null };
  }
};

const addWebAuthnOptions = async (user: DisplayUserTypes) => {
  const registrationRes = await fetch("http://localhost:3000/api/webauthn/registration-options", {
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

  const verificationRes = await fetch("http://localhost:3000/api/webauthn/registration-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, data: authRes }),
  });

  const data = await verificationRes.json();

  if (verificationRes.ok) {
    alert("You can now login using the new registered method!");
  } else {
    alert("Oops something went wrong!");
  }
};

const checkAuthOptions = async (email: string) => {
  const response = await axios.post("http://localhost:3000/api/webauthn/auth-options", {
    email,
  });
  const data = response.data;
  return data;
};

const signInWithWebAuthn = async (email: string) => {
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
      return data;
    } else {
      return null;
    }
  } catch (error) {
    alert("Wrong credentials");
  }
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/verify-jwt`, { jwt });

  if (!response.data) return false;

  const jwtExpirationMs = response.data.exp * 1000;
  return jwtExpirationMs > Date.now();
};

const authService = {
  register,
  login,
  addWebAuthnOptions,
  checkAuthOptions,
  signInWithWebAuthn,
  logout,
  verifyJwt,
};

export default authService;
