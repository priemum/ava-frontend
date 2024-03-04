import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const addressActiveAdapter = createEntityAdapter();

const initialActiveState = addressActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveAddress: builder.query({
      query: (args) => ({
        url: `/address-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData?.count;
        initialActiveState.normalData = responseData.Address;
        const loaded = responseData.Address;
        return addressActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Addresses", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Addresses", id })),
      ],
    }),
    getActiveAddressByParentId: builder.query({
      query: (args) => ({
        url: `/address-active/sub-address/${args.id}`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData?.count;
        initialActiveState.normalData = responseData.Address;
        const loaded = responseData.Address;
        return addressActiveAdapter.setAll(initialActiveState, loaded);
      },
      // providesTags: (result, error, arg) => [
      //   { type: "SubAddresses", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "SubAddresses", id })),
      // ],
    }),
  }),
});

export const {
  useGetActiveAddressQuery,
  useLazyGetActiveAddressQuery,
  useGetActiveAddressByParentIdQuery,
} = addressApiSlice;
