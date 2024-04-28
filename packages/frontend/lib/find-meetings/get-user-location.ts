"use client";

/**
 * Gets the users location using the browser's GeoLocation API.
 * @param options - The position options object
 * @returns A promise with the current user's location
 */
export function getUserLocation(options = {}): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    // Get LatLon on page load
    navigator.geolocation.getCurrentPosition(
      (val) => resolve(val.coords),
      reject,
      options,
    );
  });
}
