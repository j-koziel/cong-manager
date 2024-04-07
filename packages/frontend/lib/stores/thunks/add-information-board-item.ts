import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleThunkError } from "../errors";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { addInformationBoardItem } from "@/lib/congregation/congregation-information-board";
import { NewInformationBoardItemFormData } from "@/lib/types/dashboard";

export const addInformationBoardItemThunk = createAsyncThunk<
  void,
  NewInformationBoardItemFormData
>(
  "dashboard/addInformationBoardItem",
  async ({ type, summary, file }, { rejectWithValue }) => {
    try {
      const congregationId = (await getCurrentUser()).congregationId;

      if (!congregationId) {
        throw new Error("No congregation ID :(");
      }

      await addInformationBoardItem(
        { type, summary, file },
        congregationId.toString(),
      );
    } catch (err) {
      rejectWithValue(handleThunkError(err));
    }
  },
);
