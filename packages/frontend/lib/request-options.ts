"use client";

import { AxiosRequestConfig } from "axios";

/**
 * Gets the session token from session storage. Use this mainly for requests
 * which require an authenticated user.
 *
 * @returns An axios request config object
 */
export const requestOptions = (): AxiosRequestConfig => {
  return {
    withCredentials: true,
    headers: {
      Authorization: sessionStorage.getItem("sessionToken"),
    },
  };
};
