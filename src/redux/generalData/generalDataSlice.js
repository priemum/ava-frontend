import { apiSlice } from "../api/apiSlice";

export const generalDataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralData: builder.query({
      query: (args) => ({
        url: `/data`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
    }),
  }),
});

export const { useGetGeneralDataQuery } = generalDataApiSlice;
