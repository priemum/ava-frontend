import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const teamsActiveAdapter = createEntityAdapter();

const initialActiveState = teamsActiveAdapter.getInitialState({
  count: "",
  normalData: "",
});

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveTeams: builder.query({
      query: (args) => ({
        url: `team-active-view`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData?.count;
        initialActiveState.normalData = responseData?.Teams;
        const loaded = responseData.Teams;
        return teamsActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "Teams", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Teams", id })),
      ],
    }),
    getTeamById: builder.query({
      query: (args) => `/team/${args.id}`,
      providesTags: (result, error, args) => [{ type: "Teams", id: args.id }],
    }),
  }),
});

export const {
  useGetActiveTeamsQuery,
  useLazyGetActiveTeamsQuery,
  useGetTeamByIdQuery,
  useLazyGetTeamByIdQuery,
} = teamsApiSlice;
