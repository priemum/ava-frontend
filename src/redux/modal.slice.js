import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: null,
  galleryModal: false,
  galleryData: null,
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
  },
});

export const { showModal, hideModal, showGalleryModal, hideGalleryModal } =
  modalSlice.actions;
export const selectModal = (state) => state.modal;
export const selectState = (state) => state.modal.open;
export const selectGalleryModalState = (state) => state.modal.galleryModal;
export const selectModalData = (state) => state.modal.data;
export const selectGalleryModalData = (state) => state.modal.galleryData;

export default modalSlice.reducer;
