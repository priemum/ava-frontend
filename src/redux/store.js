import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import modalReducer from "./modal.slice";
import messageActionReducer from "./messageAction.slice";
import websiteSettingsReducer from "./websiteSettings.slice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    messageAction: messageActionReducer,
    websiteSettings: websiteSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});
