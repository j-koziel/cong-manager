import { createSlice } from "@reduxjs/toolkit";

import { InformationBoardItem } from "../types/dashboard";

import { getCongInformationBoardItemsThunk } from "./thunks/get-cong-information-board";

import { addInformationBoardItemThunk } from "@/lib/stores/thunks/add-information-board-item";

export interface InformationBoardState {
  isLoading: boolean;
  didError: boolean;
  informationBoard: InformationBoardItem[] | [];
}

const initialState: InformationBoardState = {
  isLoading: false,
  didError: false,
  informationBoard: [],
};

export const informationBoardSlice = createSlice({
  name: "information-board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInformationBoardItemThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addInformationBoardItemThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addInformationBoardItemThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.didError = true;
      })
      .addCase(getCongInformationBoardItemsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCongInformationBoardItemsThunk.fulfilled, (state, action) => {
        state.informationBoard = action.payload;
        state.isLoading = false;
      })
      .addCase(getCongInformationBoardItemsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.didError = true;
      });
  },
});
