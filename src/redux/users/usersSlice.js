import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  count: "",
  normalData: "",
});

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersByTeamId: builder.query({
      query: (args) => ({
        url: `/users/team/${args.id}`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialState.count = responseData?.count;
        initialState.normalData = responseData?.Users;
        const loaded = responseData.Users;
        return usersAdapter.setAll(initialState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Users", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Users", id })),
      ],
    }),
  }),
});

export const { useGetUsersByTeamIdQuery, useLazyGetUsersByTeamIdQuery } =
  usersApiSlice;
