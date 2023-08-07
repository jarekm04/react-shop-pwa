import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import authService from "../services/auth.service";
import { JwtTypes } from "../models/Jwt";
import { NewUserTypes } from "../models/NewUser";
import { DisplayUserTypes } from "../models/DisplayUser";
import { AuthStateTypes } from "../models/AuthState";
import { LoginUserTypes } from "../models/LoginUser";

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
    return thunkAPI.rejectWithValue("Unable to verify");
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
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};
