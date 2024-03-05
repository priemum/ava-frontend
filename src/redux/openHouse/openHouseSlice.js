import { apiSlice } from "../api/apiSlice";
export const openHouseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOpenHouse: builder.mutation({
      query: (args) => ({
        url: `/openhouse`,
        method: "POST",
        body: args.values,
      }),
      invalidatesTags: [{ type: "OpenHouse", id: "LIST" }],
    }),
  }),
});

export const { useAddOpenHouseMutation } = openHouseApiSlice;
