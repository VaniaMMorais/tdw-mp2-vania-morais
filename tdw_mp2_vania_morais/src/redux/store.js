import { configureStore } from '@reduxjs/toolkit';
import { marvelApi } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [marvelApi.reducerPath]: marvelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marvelApi.middleware),
});
