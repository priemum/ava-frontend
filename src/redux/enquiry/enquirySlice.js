import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const enquiryAdapter = createEntityAdapter();

const initialState = enquiryAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const enquiryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

export const {} = enquiryApiSlice;
