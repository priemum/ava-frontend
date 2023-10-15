import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const feedbackAdapter = createEntityAdapter();

const initialState = feedbackAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

export const {} = feedbackApiSlice;
