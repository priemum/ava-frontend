import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const propertiesActiveAdapter = createEntityAdapter();
const propertiesActiveFilteredAdapter = createEntityAdapter();

const initialActiveState = propertiesActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});
const initialActiveFilteredState =
  propertiesActiveFilteredAdapter.getInitialState({
    count: "",
    normalData: [],
  });

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveProperties: builder.query({
      query: (args) => ({
        url: `/${
          args?.searchTerm
            ? `property/search/${args.searchTerm}`
            : `property-active`
        }?page=${args?.page ? args.page : ""}&limit=${
          args?.limit ? args.limit : ""
        } `,
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

    getActiveFilteredProperties: builder.mutation({
      query: (args) => ({
        url: `/property/filter?page=${args?.page ? args.page : ""}&limit=${
          args?.limit ? args.limit : ""
        } `,
        method: "POST",
        body: args.form,
      }),
      transformResponse: (responseData) => {
        initialActiveFilteredState.count = responseData.count;
        initialActiveFilteredState.normalData = responseData.Properties;
        const loadedFilteredProperties = responseData.Properties;
        return propertiesActiveFilteredAdapter.setAll(
          initialActiveState,
          loadedFilteredProperties
        );
      },
      providesTags: (result, error, arg) => [
        { type: "FilteredProperties", id: "LIST" },
        ...result.ids.map((id) => ({ type: "FilteredProperties", id })),
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
  useGetActiveFilteredPropertiesMutation,
  useLazyGetActivePropertiesQuery,
  useGetActivePropertiesQuery,
  useGetPropertyByIdQuery,
} = propertiesApiSlice;
