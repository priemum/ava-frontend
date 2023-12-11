import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  MinSize: "",
  MaxSize: "",
  MinPrice: "",
  MaxPrice: "",
};
export const generalDataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralData: builder.query({
      query: (args) => ({
        url: `/data`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        // console.log("Reponse", responseData);
        return responseData;
      },
      // providesTags: (result, error, args) => [
      //   { type: "generalData", id: args.id },
      // ],
    }),
  }),
});

export const { useGetGeneralDataQuery } = generalDataApiSlice;
