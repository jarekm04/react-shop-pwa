import { DisplayUserTypes } from "./DisplayUser";
import { JwtTypes } from "./Jwt";
import { LoginUserTypes } from "./LoginUser";
import { NewUserTypes } from "./NewUser";
import { StatusStateTypes } from "@types/index";

export interface AuthStateTypes extends StatusStateTypes {
  user?: DisplayUserTypes | null;
  jwt?: JwtTypes;
  isAuthenticated?: boolean;
  userEmail?: string;
  userHasWebAuthn?: boolean;
  register: (newUser: NewUserTypes) => unknown;
  login: (user: LoginUserTypes) => unknown;
  logout: () => unknown;
  verifyJwt: (jwt: string) => unknown;
  addWebAuthnOptions: (user: DisplayUserTypes) => unknown;
  checkAuthOptions: (email: string) => unknown;
  signInWithWebAuthn: (email: string) => unknown;
}