export const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendRoutes = {
  congregation: {
    create: baseBackendUrl + "/congregation/create",
  },
  getLocalMeetings: baseBackendUrl + "/meetings",
};

export const userErrors = {
  unknown: "Unknown error. Please try again and report if the error persists.",
  invalidBackendResponse:
    "The server sent an invalid response. Please report this if it persists.",
};