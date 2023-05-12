import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user");

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logout(state) {
      localStorage.removeItem("user");
      return null;
    },
  },
});

const isAuthenticated = (state) => !(state.auth === null);

const { login, logout } = auth.actions;

export { login, logout, isAuthenticated };
export default auth.reducer;
