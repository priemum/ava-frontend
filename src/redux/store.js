import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import modalReducer from "./modal.slice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
