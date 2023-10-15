import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const articlesActiveAdapter = createEntityAdapter();

const initialActiveState = articlesActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveArticles: builder.query({
      query: (args) => ({
        url: `/article-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData.count;
        initialActiveState.normalData = responseData.Articles;
        const loadedArticles = responseData.Articles;
        return articlesActiveAdapter.setAll(initialActiveState, loadedArticles);
      },
      providesTags: (result, error, arg) => [
        { type: "Articles", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Articles", id })),
      ],
    }),
    getArticleById: builder.query({
      query: (args) => `/article/${args.id}`,
      providesTags: (result, error, args) => [
        { type: "Articles", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetArticleByIdQuery,
  useLazyGetArticleByIdQuery,
  useGetActiveArticlesQuery,
  useLazyGetActiveArticlesQuery,
} = articlesApiSlice;
