import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { getCongInformationBoardItems } from "@/lib/congregation/congregation-information-board";
import { InformationBoardItem } from "@/lib/types/dashboard";

export const getCongInformationBoardItemsThunk = createAsyncThunk<
  InformationBoardItem[],
  void
>("dashboard/getCongInformationBoardItems", async (_, { rejectWithValue }) => {
  try {
    return await getCongInformationBoardItems();
  } catch (err) {
    return rejectWithValue(handleThunkError(err));
  }
});
