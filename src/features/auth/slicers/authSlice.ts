import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import authService from "../services/auth.service";
import { JwtTypes } from "../types/Jwt";
import { NewUserTypes } from "../types/NewUser";
import { DisplayUserTypes } from "../types/DisplayUser";
import { AuthStateTypes } from "../types/AuthState";
import { LoginUserTypes } from "../types/LoginUser";

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
};

export const register = createAsyncThunk("auth/register", async (newUser: NewUserTypes, thunkApi) => {
  try {
    return await authService.register(newUser);
  } catch (error) {
    return thunkApi.rejectWithValue("Unable to register!");
  }
});

export const login = createAsyncThunk("auth/login", async (user: LoginUserTypes, thunkApi) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkApi.rejectWithValue("Unable to login!");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const verifyJwt = createAsyncThunk("auth/verify-jwt", async (jwt: string, thunkAPI) => {
  try {
    return await authService.verifyJwt(jwt);
  } catch (error) {
    return thunkAPI.rejectWithValue("Unable to verify!");
  }
});

export const addWebAuthnOptions = createAsyncThunk(
  "webauthn/addWebAuthnOptions",
  async (user: DisplayUserTypes, thunkAPI) => {
    try {
      return await authService.addWebAuthnOptions(user);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to add WebAuthn Options!");
    }
  }
);

export const checkAuthOptions = createAsyncThunk("webauthn/checkAuthOptions", async (email: string, thunkAPI) => {
  try {
    return await authService.checkAuthOptions(email);
  } catch (error) {
    return thunkAPI.rejectWithValue("Unable to check WebAuthn Options");
  }
});

export const signInWithWebAuthn = createAsyncThunk("webauthn/loginWebAuthn", async (email: string, thunkAPI) => {
  try {
    return await authService.signInWithWebAuthn(email);
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    } else {
      throw new Error("Unable to sign in with WebAuthn!");
    }
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, jwt } = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.jwt = jwt;
        state.user = user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.jwt = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
        state.userEmail = "";
        state.userHasWebAuthn = false;
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isAuthenticated = false;
      })
      // WEBAUTHN CHECK OPTIONS
      .addCase(checkAuthOptions.fulfilled, (state, action) => {
        const { email, webauthn } = action.payload;
        state.userEmail = email;
        state.userHasWebAuthn = webauthn;
      })
      .addCase(checkAuthOptions.rejected, (state) => {
        state.userEmail = "";
        state.userHasWebAuthn = false;
      })
      // WEBAUTHN LOGIN
      .addCase(signInWithWebAuthn.pending, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(signInWithWebAuthn.fulfilled, (state, action) => {
        if (!action.payload) return;
        const { user } = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = user;
        state.isAuthenticated = true;
      })
      .addCase(signInWithWebAuthn.rejected, (state) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};
