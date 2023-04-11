import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import display from "./display";
import entitiesApi from "./entities";

const store = configureStore({
  reducer: {
    auth,
    display,
    [entitiesApi.reducerPath]: entitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(entitiesApi.middleware),
});

export default store;
