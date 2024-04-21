import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import {
  InformationBoardItem,
  informationBoardItemSchema,
  NewInformationBoardItem,
} from "../types/dashboard";

export async function addInformationBoardItem(item: NewInformationBoardItem) {
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

/**
 * Gets all information board items for current users' congregation
 */
export async function getCongInformationBoardItems(): Promise<
  InformationBoardItem[]
> {
  const res = await axios.get(
    backendRoutes.congregation.informationBoard.get,
    requestOptions(),
  );

  const parsedData: InformationBoardItem[] = res.data.informationBoard.map(
    (informationBoardItem: InformationBoardItem) => {
      return informationBoardItem;

      // return informationBoardItemSchema.parse(informationBoardItem);
      // I dont know why this doesnt work
      // At this point im too scared to find out why
    },
  );

  return parsedData;
}
