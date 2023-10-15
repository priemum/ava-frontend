import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const developersActiveAdapter = createEntityAdapter();
const initialActiveState = developersActiveAdapter.getInitialState({
  count: "",
  normalData: [],
});

export const developersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveDevelopers: builder.query({
      query: (args) => ({
        url: `/developer-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData.count;
        initialActiveState.normalData = responseData.Developer;
        const loaded = responseData.Developer;
        return developersActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Developers", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Developers", id })),
      ],
    }),
  }),
});

export const { useGetActiveDevelopersQuery, useLazyGetActiveDevelopersQuery } =
  developersApiSlice;
