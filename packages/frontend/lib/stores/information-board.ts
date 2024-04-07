import { createSlice } from "@reduxjs/toolkit";

import { addInformationBoardItemThunk } from "@/lib/stores/thunks/add-information-board-item";

export interface InformationBoardState {
  isLoading: boolean;
  didError: boolean;
}

const initialState: InformationBoardState = {
  isLoading: false,
  didError: false,
};

export const informationBoardSlice = createSlice({
  name: "information-board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addInformationBoardItemThunk.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});
