import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const lngAdapter = createEntityAdapter();

const initialState = lngAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const lngApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLNG: builder.query({
      query: (args) => ({
        url: `/language`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialState.count = responseData?.length;
        initialState.normalData = responseData;
        const loaded = responseData;
        return lngAdapter.setAll(initialState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Languages", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Languages", id })),
      ],
    }),
  }),
});

export const { useGetLNGQuery, useLazyGetLNGQuery } = lngApiSlice;
