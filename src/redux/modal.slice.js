import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: null,
  galleryModal: false,
  galleryData: null,
  settingsModal: false,
  settingsData: null,
  announcementModal: false,
  announcementData: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.open = true;
      state.data = action.payload;
    },
    hideModal: (state, action) => {
      state.open = false;
      state.data = null;
    },
    showGalleryModal: (state, action) => {
      state.galleryModal = true;
      state.galleryData = action.payload;
    },
    hideGalleryModal: (state, action) => {
      state.galleryModal = false;
      state.galleryData = null;
    },
    showAnnouncementModal: (state, action) => {
      state.announcementModal = true;
      state.announcementData = action.payload;
    },
    hideAnnouncementModal: (state, action) => {
      state.announcementModal = false;
      state.announcementData = null;
    },
    showSettingsModal: (state, action) => {
      state.settingsModal = true;
      state.settingsData = action.payload;
    },
    hideSettingsModal: (state, action) => {
      state.settingsModal = false;
      state.settingsData = null;
    },
  },
});

export const {
  showModal,
  hideModal,
  showGalleryModal,
  hideGalleryModal,
  showSettingsModal,
  hideSettingsModal,
  showAnnouncementModal,
  hideAnnouncementModal,
} = modalSlice.actions;
export const selectModal = (state) => state.modal;
export const selectState = (state) => state.modal.open;
export const selectGalleryModalState = (state) => state.modal.galleryModal;
export const selectSettingsModalState = (state) => state.modal.settingsModal;
export const selectAnnouncementModalState = (state) =>
  state.modal.announcementModal;
export const selectModalData = (state) => state.modal.data;
export const selectGalleryModalData = (state) => state.modal.galleryData;
export const selectSettingsModalData = (state) => state.modal.settingsData;
export const selectAnnouncementModalData = (state) =>
  state.modal.announcementData;

export default modalSlice.reducer;
