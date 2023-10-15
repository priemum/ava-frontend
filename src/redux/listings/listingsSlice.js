import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const listingsAdapter = createEntityAdapter();

const initialState = listingsAdapter.getInitialState({
  count: "",
});

export const listingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

export const {} = listingsApiSlice;
