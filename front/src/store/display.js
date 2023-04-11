import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const display = createSlice({
  name: "display",
  initialState,
  reducers: {
    show(state, action) {
      return state.filter(i => i !== action.payload);
    },
    hide(state, action) {
      return [...state, action.payload];
    },
    clear(state) {
      console.log('clear')
      return [];
    },
  },
});

const isShown = (state) => (entityId) => !(state.display.includes(entityId));

const { show, hide, clear } = display.actions;

export { show, hide, clear, isShown };
export default display.reducer;
