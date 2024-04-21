import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import {
  InformationBoardItem,
  informationBoardItemSchema,
  NewInformationBoardItem,
} from "../types/dashboard";

/**
 * Takes in a new information board item and sends it to the API
 * @param item The new information board item to be added
 */
export async function addInformationBoardItem(
  item: NewInformationBoardItem,
): Promise<void> {
  await axios.post(
    backendRoutes.congregation.informationBoard.add,
    item,
    requestOptions(),
  );
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
      return informationBoardItemSchema.parse(informationBoardItem);
    },
  );

  return parsedData;
}
