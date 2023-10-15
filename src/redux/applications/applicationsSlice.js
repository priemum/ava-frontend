import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const applicationAdapter = createEntityAdapter();

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

export const {} = applicationApiSlice;
