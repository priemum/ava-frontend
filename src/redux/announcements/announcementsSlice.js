import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const announcementsAdapter = createEntityAdapter();

const initialState = announcementsAdapter.getInitialState({
  count: "",
  activeCount: "",
  PopUp: [],
  Normal: [],
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
        const p = responseData.Announcement.filter((x) => x.Type == "PopUp");
        const n = responseData.Announcement.filter((x) => x.Type == "Normal");
        initialState.PopUp = p;
        initialState.Normal = n;
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
