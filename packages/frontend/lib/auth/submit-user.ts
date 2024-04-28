import axios from "axios";

import { backendRoutes } from "../config";
import { RegisterUserFormData } from "../types/auth/user-form";
import { User, userSchema } from "../types/models/user";

/**
 * Takes in form data from the register form and sends that to the API to check
 * whether the information is valid. If successful the new user is created and
 * the user data is returned
 *
 * @param userFormData - The form data which potential new users have filled out
 * @returns The new user object
 */
export async function submitUser(
  userFormData: RegisterUserFormData,
): Promise<User> {
  // This is a Partial<User> because at this time we may not have
  // all the relevant user data like joinToken etc.
  const user: Partial<User> = {
    firstName: userFormData.firstName,
    lastName: userFormData.lastName,
    email: userFormData.email,
    type: userFormData.type,
  };

  const response = await axios.post(backendRoutes.user.create, {
    ...user,
    password: userFormData.password,
  });

  return userSchema.parse(response.data.user);
}
