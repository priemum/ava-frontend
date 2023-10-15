import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const currencyActiveAdapter = createEntityAdapter();

const initialActiveState = currencyActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const currencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCurrency: builder.query({
      query: (args) => ({
        url: `/currency-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData?.length;
        initialActiveState.normalData = responseData;
        const loaded = responseData;
        return currencyActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Currencies", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Currencies", id })),
      ],
    }),
    getCurrencyById: builder.query({
      query: (args) => `/currency/${args.id}`,
      providesTags: (result, error, args) => [
        { type: "Currencies", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetCurrencyByIdQuery,
  useLazyGetCurrencyByIdQuery,
  useGetActiveCurrencyQuery,
  useLazyGetActiveCurrencyQuery,
} = currencyApiSlice;
