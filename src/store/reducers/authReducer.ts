import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
}

type AuthState = {
  userData: UserData | null;
  token: string | null;
};
const initialState: AuthState = {
  userData: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
