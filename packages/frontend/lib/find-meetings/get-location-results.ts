import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { locationSearchResponse } from "../types/location";

/**
 * Makes a request to the API which uses OpenCage™ Geocoding API to reverse
 * geocode the provided query
 *
 * @param query - the location the user wants to find
 * @returns - A list of locations which match the query
 */
export async function getLocationResults(query: string) {
  try {
    const res = await axios.get(
      `${backendRoutes.user.findLocation}?q=${query}`,
      requestOptions(),
    );

    const parsedLocationResults = locationSearchResponse.parse(res.data);
    return parsedLocationResults;
  } catch (err) {
    throw err;
  }
}
