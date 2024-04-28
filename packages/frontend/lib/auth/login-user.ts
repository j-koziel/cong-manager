import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { LoginUserFormData } from "../types/auth/user-form";

/**
 * Logs in the user with the provided form. If the credentials are correct then
 * the received access token is stored in the browser's session storage.
 *
 * @param data - The form that the user filled out
 */
export async function loginUser(data: LoginUserFormData) {
  const res = await axios.post(
    backendRoutes.user.login,
    data,
    requestOptions(),
  );

  sessionStorage.setItem("sessionToken", res.data.sessionToken);
}

/**
 * Logs out the user by removing the session token from session storage and
 * calling the log out endpoint in the API
 */
export async function logoutUser() {
  sessionStorage.removeItem("sessionToken");
  await axios.post(backendRoutes.user.logout, {}, requestOptions());
}
