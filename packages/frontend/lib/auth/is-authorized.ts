import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";

/**
 * Makes a request to the API which gets the current user.
 * If there is no error that means the current user is authorized.
 * Not authorized if an error is received.
 *
 * @returns Whether the current user is authorized
 */
export async function isAuthorized(): Promise<boolean> {
  try {
    await axios.get(backendRoutes.user.me, requestOptions());
    return true;
    // eslint-disable-next-line prettier/prettier
  } catch (error) { }

  return false;
}
