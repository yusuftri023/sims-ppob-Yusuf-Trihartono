import { createSlice } from "@reduxjs/toolkit";

type WebContentState = {
  showModal: boolean;
  typeModal: string | null;
  contentModal: null | Record<string, null | boolean | string | number>;
  error: null | string;
  showPopUp: boolean;
};
const initialState: WebContentState = {
  showModal: false,
  typeModal: null,
  contentModal: null,
  error: null,
  showPopUp: false,
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
    setError: (state, { payload }: { payload: string | null }) => {
      state.error = payload;
    },
    popUpToggle: (state, action: { payload: boolean }) => {
      state.showPopUp = action.payload;
    },
  },
});
export const { modalChange, modalToggle, setError, popUpToggle } =
  webContentSlice.actions;
export default webContentSlice.reducer;
