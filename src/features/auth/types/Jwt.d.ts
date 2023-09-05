import { DisplayUserTypes } from "./DisplayUser";

export type JwtTypes = { token: string } | null;

export interface DecodedJwtTypes {
  user: DisplayUserTypes;
  exp: number;
  iat: number;
}