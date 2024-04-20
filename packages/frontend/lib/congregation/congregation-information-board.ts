import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { InformationBoardItem } from "../types/dashboard";

export async function addInformationBoardItem(item: InformationBoardItem) {
  try {
    await axios.post(
      backendRoutes.congregation.informationBoard.add,
      item,
      requestOptions(),
    );
  } catch (err) {
    throw err;
  }
}
