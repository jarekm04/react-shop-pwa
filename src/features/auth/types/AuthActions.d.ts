export type RegisterAction =
  | { type: "REGISTER_PENDING" }
  | { type: "REGISTER_FULFILLED"; payload: { data } }
  | { type: "REGISTER_REJECTED" };

export type LoginAction =
  | { type: "LOGIN_PENDING" }
  | { type: "LOGIN_FULFILLED"; payload: { data } }
  | { type: "LOGIN_REJECTED" };

export type LogoutAction = { type: "LOGOUT_PENDING" } | { type: "LOGOUT_FULFILLED" } | { type: "LOGOUT_REJECTED" };

export type VerifyJwtAction =
  | { type: "VERIFYJWT_PENDING" }
  | { type: "VERIFYJWT_FULFILLED"; payload: { data } }
  | { type: "VERIFYJWT_REJECTED" };

export type AddWebAuthnOptions =
  | { type: "ADDWEBAUTHNOPTIONS_PENDING" }
  | { type: "ADDWEBAUTHNOPTIONS_FULFILLED"; payload: { data } }
  | { type: "ADDWEBAUTHNOPTIONS_REJECTED" };

export type CheckAuthOptionsAction =
  | { type: "CHECKAUTHOPTIONS_PENDING" }
  | { type: "CHECKAUTHOPTIONS_FULFILLED"; payload: { data } }
  | { type: "CHECKAUTHOPTIONS_REJECTED" };

export type SignInWithWebAuthnAction =
  | { type: "SIGNINWITHWEBAUTHN_PENDING" }
  | { type: "SIGNINWITHWEBAUTHN_FULFILLED"; payload: { data } }
  | { type: "SIGNINWITHWEBAUTHN_REJECTED" };

export type AuthAction =
  | RegisterAction
  | LoginAction
  | LogoutAction
  | VerifyJwtAction
  | AddWebAuthnOptions
  | CheckAuthOptionsAction
  | SignInWithWebAuthnAction;

export interface AuthActionsTypes {
  REGISTER_PENDING: "REGISTER_PENDING";
  REGISTER_FULFILLED: "REGISTER_FULFILLED";
  REGISTER_REJECTED: "REGISTER_REJECTED";
  LOGIN_PENDING: "LOGIN_PENDING";
  LOGIN_FULFILLED: "LOGIN_FULFILLED";
  LOGIN_REJECTED: "LOGIN_REJECTED";
  LOGOUT_PENDING: "LOGOUT_PENDING";
  LOGOUT_FULFILLED: "LOGOUT_FULFILLED";
  LOGOUT_REJECTED: "LOGOUT_REJECTED";
  VERIFYJWT_PENDING: "VERIFYJWT_PENDING";
  VERIFYJWT_FULFILLED: "VERIFYJWT_FULFILLED";
  VERIFYJWT_REJECTED: "VERIFYJWT_REJECTED";
  ADDWEBAUTHNOPTIONS_PENDING: "ADDWEBAUTHNOPTIONS_PENDING";
  ADDWEBAUTHNOPTIONS_FULFILLED: "ADDWEBAUTHNOPTIONS_FULFILLED";
  ADDWEBAUTHNOPTIONS_REJECTED: "ADDWEBAUTHNOPTIONS_REJECTED";
  CHECKAUTHOPTIONS_PENDING: "CHECKAUTHOPTIONS_PENDING";
  CHECKAUTHOPTIONS_FULFILLED: "CHECKAUTHOPTIONS_FULFILLED";
  CHECKAUTHOPTIONS_REJECTED: "CHECKAUTHOPTIONS_REJECTED";
  SIGNINWITHWEBAUTHN_PENDING: "SIGNINWITHWEBAUTHN_PENDING";
  SIGNINWITHWEBAUTHN_FULFILLED: "SIGNINWITHWEBAUTHN_FULFILLED";
  SIGNINWITHWEBAUTHN_REJECTED: "SIGNINWITHWEBAUTHN_REJECTED";
}
