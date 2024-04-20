import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { addInformationBoardItem } from "@/lib/congregation/congregation-information-board";
import { InformationBoardItem } from "@/lib/types/dashboard";

export const addInformationBoardItemThunk = createAsyncThunk<
  void,
  InformationBoardItem
>(
  "dashboard/addInformationBoardItem",
  async ({ type, summary, file }, { rejectWithValue }) => {
    try {
      await addInformationBoardItem({ type, summary, file });
    } catch (err) {
      rejectWithValue(handleThunkError(err));
    }
  },
);
