import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { addInformationBoardItem } from "@/lib/congregation/congregation-information-board";
import { NewInformationBoardItem } from "@/lib/types/dashboard";

export const addInformationBoardItemThunk = createAsyncThunk<
  void,
  NewInformationBoardItem
>(
  "dashboard/addInformationBoardItem",
  async ({ type, summary, congregationId }, { rejectWithValue }) => {
    try {
      await addInformationBoardItem({ type, summary, congregationId });
    } catch (err) {
      return rejectWithValue(handleThunkError(err));
    }
  },
);
