import { apiSlice } from "../api/apiSlice";
export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addApplication: builder.mutation({
      query: (args) => ({
        url: `/applicant`,
        method: "POST",
        body: args.values,
      }),
      invalidatesTags: [{ type: "Applications", id: "LIST" }],
    }),
  }),
});

export const { useAddApplicationMutation } = applicationApiSlice;
