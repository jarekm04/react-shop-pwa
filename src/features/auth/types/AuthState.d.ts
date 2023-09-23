import { DisplayUserTypes } from "./DisplayUser";
import { JwtTypes } from "./Jwt";
import { StatusStateTypes } from "@types/index";

export interface AuthStateTypes extends StatusStateTypes {
  user?: DisplayUserTypes | null;
  jwt?: JwtTypes;
  isAuthenticated?: boolean;
  userEmail?: string;
  userHasWebAuthn?: boolean;
  register: () => unknown;
  login: () => unknown;
  logout: () => unknown;
  verifyJwt: () => unknown;
  addWebAuthnOptions: () => unknown;
  checkAuthOptions: () => unknown;
  signInWithWebAuthn: () => unknown;
}