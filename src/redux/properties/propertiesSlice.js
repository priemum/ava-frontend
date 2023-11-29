import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const propertiesActiveAdapter = createEntityAdapter();

const initialActiveState = propertiesActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveProperties: builder.query({
      query: (args) => ({
        url: `/property-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData.count;
        initialActiveState.normalData = responseData.Properties;
        const loadedProperties = responseData.Properties;
        return propertiesActiveAdapter.setAll(
          initialActiveState,
          loadedProperties
        );
      },
      providesTags: (result, error, arg) => [
        { type: "Properties", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Properties", id })),
      ],
    }),
    getPropertyById: builder.query({
      query: (args) => `/property/${args.id}`,
      providesTags: (result, error, args) => [
        { type: "Properties", id: args.id },
      ],
    }),
  }),
});

export const {
  useLazyGetPropertyByIdQuery,
  useGetActivePropertiesQuery,
  useGetPropertyByIdQuery,
  useLazyGetActivePropertiesQuery,
} = propertiesApiSlice;
