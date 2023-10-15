import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const categoryActiveAdapter = createEntityAdapter();

const initialActiveState = categoryActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCategory: builder.query({
      query: (args) => ({
        url: `/category-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData?.count;
        initialActiveState.normalData = responseData.Category;
        const loaded = responseData.Category;
        return categoryActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Cateogories", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Cateogories", id })),
      ],
    }),
    getCategoryById: builder.query({
      query: (args) => `/category/${args.id}`,
      providesTags: (result, error, args) => [
        { type: "Category", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetCategoryByIdQuery,
  useLazyGetCategoryByIdQuery,
  useGetActiveCategoryQuery,
  useLazyGetActiveCategoryQuery,
} = categoryApiSlice;
