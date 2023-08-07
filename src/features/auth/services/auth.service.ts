import axios from "axios";
import jwt_decode from "jwt-decode";
import { DisplayUserTypes } from "../models/DisplayUser";
import { NewUserTypes } from "../models/NewUser";
import { LoginUserTypes } from "../models/LoginUser";
import { DecodedJwtTypes, JwtTypes } from "../models/Jwt";

const register = async (newUser: NewUserTypes): Promise<DisplayUserTypes | null> => {
  const response = await axios.post(`${import.meta.env.VITE_API_HOST}/auth/register`, newUser);
  return response.data;
};

const login = async (user: LoginUserTypes): Promise<{ jwt: JwtTypes; user: DisplayUserTypes | null }> => {
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
  logout,
  verifyJwt,
};

export default authService;
