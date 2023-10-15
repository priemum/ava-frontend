import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const announcementsAdapter = createEntityAdapter();

const initialState = announcementsAdapter.getInitialState({
  count: "",
  activeCount: "",
});

export const announcementsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

export const {} = announcementsApiSlice;
