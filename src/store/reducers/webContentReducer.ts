import { createSlice } from "@reduxjs/toolkit";

type WebContentState = {
  showModal: boolean;
  typeModal: string | null;
  contentModal: null | Record<string, null | boolean | string | number>;
};
const initialState: WebContentState = {
  showModal: false,
  typeModal: null,
  contentModal: null,
};
const webContentSlice = createSlice({
  name: "webContent",
  initialState,
  reducers: {
    modalToggle: (state, action) => {
      state.showModal =
        typeof action.payload === "boolean" ? action.payload : !state.showModal;
    },

    modalChange: (state, { payload }) => {
      state.typeModal = payload.type;
      state.contentModal = payload.content;
    },
  },
});
export const { modalChange, modalToggle } = webContentSlice.actions;
export default webContentSlice.reducer;
