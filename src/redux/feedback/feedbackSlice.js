import { apiSlice } from "../api/apiSlice";
export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (args) => ({
        url: `/feedback`,
        method: "POST",
        body: args.form,
      }),
      invalidatesTags: [{ type: "Feedback", id: "LIST" }],
    }),
  }),
});

export const { useAddFeedbackMutation } = feedbackApiSlice;
