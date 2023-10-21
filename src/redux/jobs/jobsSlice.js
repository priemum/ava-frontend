import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const jobsActiveAdapter = createEntityAdapter();

const initialActiveState = jobsActiveAdapter.getInitialState({
  count: "",
  activeCount: "",
});

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveJobs: builder.query({
      query: (args) => ({
        url: `/job-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialActiveState.count = responseData.count;
        initialActiveState.normalData = responseData.Jobs;
        const loaded = responseData.Jobs;
        return jobsActiveAdapter.setAll(initialActiveState, loaded);
      },
      providesTags: (result, error, arg) => [
        { type: "ActiveJobs", id: "LIST" },
        ...result.ids.map((id) => ({ type: "ActiveJobs", id })),
      ],
    }),

    getJobById: builder.query({
      query: (args) => `/job/${args.id}`,
      providesTags: (result, error, args) => [{ type: "Jobs", id: args.id }],
    }),
  }),
});

export const {
  useLazyGetJobByIdQuery,
  useGetActiveJobsQuery,
  useLazyGetActiveJobsQuery,
  useGetJobByIdQuery,
} = jobsApiSlice;
