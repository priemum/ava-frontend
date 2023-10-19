import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const announcementsAdapter = createEntityAdapter();

const initialState = announcementsAdapter.getInitialState({
  count: "",
  activeCount: "",
});

export const announcementsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveAnnouncements: builder.query({
      query: (args) => ({
        url: `/announcement-active`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        initialState.count = responseData.count;
        initialState.normalData = responseData.Announcement;
        const loadedArticles = responseData.Announcement;
        return announcementsAdapter.setAll(initialState, loadedArticles);
      },
      providesTags: (result, error, arg) => [
        { type: "Announcements", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Announcements", id })),
      ],
    }),
  }),
});

export const {
  useGetActiveAnnouncementsQuery,
  useLazyGetActiveAnnouncementsQuery,
} = announcementsApiSlice;
