import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import entitiesApi from "./entities";

const store = configureStore({
  reducer: {
    auth,
    [entitiesApi.reducerPath]: entitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(entitiesApi.middleware),
});

export default store;
