import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const unitActiveAdapter = createEntityAdapter();

const initialActiveState = unitActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const unitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveUnit: builder.query({
      query: (args) => ({
        url: `/unit-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData?.length;
        initialActiveState.normalData = responseData.Unit;
        const loaded = responseData.Unit;
        return unitActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Units", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Units", id })),
      ],
    }),
    getUnitById: builder.query({
      query: (args) => `/unit/${args.id}`,
      providesTags: (result, error, args) => [{ type: "Unit", id: args.id }],
    }),
  }),
});

export const {
  useGetUnitByIdQuery,
  useLazyGetUnitByIdQuery,
  useGetActiveUnitQuery,
  useLazyGetActiveUnitQuery,
} = unitApiSlice;
