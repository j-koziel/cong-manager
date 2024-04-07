import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { NewInformationBoardItemFormData } from "../types/dashboard";

export async function addInformationBoardItem(
  item: NewInformationBoardItemFormData,
  congregationId: string,
) {
  try {
    await axios.post(
      backendRoutes.congregation.newInformationBoardItem(congregationId),
      item,
      requestOptions(),
    );
  } catch (err) {
    throw err;
  }
}
