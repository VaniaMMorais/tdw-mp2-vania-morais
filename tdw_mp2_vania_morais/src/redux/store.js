import { configureStore } from "@reduxjs/toolkit";
import { marvelApi } from "./api/apiSlice";
import favoritesReducer from "./api/favoritesSlice";

export const store = configureStore({
  reducer: {
    [marvelApi.reducerPath]: marvelApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marvelApi.middleware),
});
