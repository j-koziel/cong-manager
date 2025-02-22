import { configureStore } from "@reduxjs/toolkit";

import { dashboardSlice } from "./dashboard/dashboard";
import { dashboardToolbarSlice } from "./dashboard/toolbar";
import { informationBoardSlice } from "./information-board";
import { meetingsSlice } from "./local-meetings";
import { locationSearchSlice } from "./location-search";
import { userRegistrationSlice } from "./register-user";

export const makeStore = () => {
  return configureStore({
    reducer: {
      meetings: meetingsSlice.reducer,
      locationSearch: locationSearchSlice.reducer,
      userRegistration: userRegistrationSlice.reducer,
      dashboard: dashboardSlice.reducer,
      dashboardToolbar: dashboardToolbarSlice.reducer,
      informationBoard: informationBoardSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
