import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants";
export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: [
    "Properties",
    "Teams",
    "MetaData",
    "Announcements",
    "Articles",
    "Addresses",
    "Amenities",
    "Applications",
    "Users",
    "Jobs",
    "Cateogories",
    "Currencies",
    "Units",
    "Developers",
    "Enquiries",
    "Feedback",
    "Feedback",
    "Listings",
    "Languages",
    "generalData",
  ],
  endpoints: (builder) => ({}),
});
