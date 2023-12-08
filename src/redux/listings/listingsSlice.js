import { apiSlice } from "../api/apiSlice";
export const listingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addListing: builder.mutation({
      query: (args) => ({
        url: `/list-with-us`,
        method: "POST",
        body: args.values,
      }),
      invalidatesTags: [{ type: "Listings", id: "LIST" }],
    }),
  }),
});

export const { useAddListingMutation } = listingApiSlice;
