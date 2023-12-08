import { apiSlice } from "../api/apiSlice";
export const enquiryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEnquiry: builder.mutation({
      query: (args) => ({
        url: `/enquiry`,
        method: "POST",
        body: args.values,
      }),
      invalidatesTags: [{ type: "Enquiries", id: "LIST" }],
    }),
  }),
});

export const { useAddEnquiryMutation } = enquiryApiSlice;
