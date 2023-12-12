import { createSlice } from "@reduxjs/toolkit";

const websiteSettingsSlice = createSlice({
  name: "websiteSettings",
  initialState: {
    unitCR: localStorage.getItem("unitCR")
      ? JSON.parse(localStorage.getItem("unitCR"))
      : {
          conversionRate: 1,
          Unit_Translation: [
            {
              Name: "SQ.FT",
              Language: {
                Name: "English",
                Code: "En",
              },
            },
            {
              Name: "قدم مربع",
              Language: {
                Name: "Arabic",
                Code: "Ar",
              },
            },
            {
              Name: "",
              Language: {
                Name: "Persian",
                Code: "Fa",
              },
            },
            {
              Name: "",
              Language: {
                Name: "Russian",
                Code: "Ru",
                Direction: "ltr",
              },
            },
          ],
        },
    currencyCR: localStorage.getItem("currencyCR")
      ? JSON.parse(localStorage.getItem("currencyCR"))
      : {
          conversionRate: 1,
          Currency_Translation: [
            {
              Name: "AED",
              Symbol: "AED",
              Language: {
                Name: "English",
                Code: "En",
              },
            },
            {
              Name: "درهم",
              Symbol: "AED",
              Language: {
                Name: "Arabic",
                Code: "Ar",
              },
            },
            {
              Name: "",
              Symbol: "",
              Language: {
                Name: "Persian",
                Code: "Fa",
              },
            },
            {
              Name: "",
              Symbol: "",
              Language: {
                Name: "Russian",
                Code: "Ru",
              },
            },
          ],
        },
  },
  reducers: {
    setUnitCR: (state, action) => {
      localStorage.setItem("unitCR", JSON.stringify(action.payload));
      state.unitCR = JSON.parse(localStorage.getItem("unitCR"));
    },
    setCurrencyCR: (state, action) => {
      localStorage.setItem("currencyCR", JSON.stringify(action.payload));
      state.currencyCR = JSON.parse(localStorage.getItem("currencyCR"));
    },
  },
});

export const { setUnitCR, setCurrencyCR } = websiteSettingsSlice.actions;

export default websiteSettingsSlice.reducer;

export const selectCurrentUnit = (state) => state.websiteSettings.unitCR;
export const selectCurrentCurrency = (state) =>
  state.websiteSettings.currencyCR;
