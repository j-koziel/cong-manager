"use client";

import React from "react";

import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { DashboardComponentProps } from "./types";

import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { getCurrentUserThunk } from "@/lib/stores/thunks/get-current-user";
import { UserType } from "@/lib/types/models/user";

const AdminDashboard = dynamic(() =>
  import("./admin/dashboard").then((mod) => mod.AdminDashboard),
);
const UserDashboard = dynamic(() =>
  import("./regular/dashboard").then((mod) => mod.UserDashboard),
);

/**
 * A user dashboard where publishers can access their information,
 * view congregation announcments and the todo features listed below
 *
 * @todo public witnessing scheduling feature
 * @todo meeting duty/assignment features
 * @todo events feature
 * @todo other stuff which need to be planned
 *
 * @returns The user dashboard
 */
export function Dashboard() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboard);

  React.useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, []);

  React.useEffect(() => {
    if (!state.didError) {
      return;
    }

    router.replace("/login");
  }, []);

  // Map of user type to dashboard component
  const userTypeMap: Record<
    UserType,
    React.ComponentType<DashboardComponentProps>
  > = React.useMemo(() => {
    return { ADMIN: AdminDashboard, REGULAR: UserDashboard };
  }, []);

  const renderDashboard = () => {
    if (state.isLoading || !state.currentUser) {
      return (
        <div className="h-screen grid place-items-center">
          <Spinner size="lg" />
        </div>
      );
    }

    const DashboardComponent = userTypeMap[state.currentUser.type];
    return <DashboardComponent currentUser={state.currentUser} />;
  };

  return <div className="p-4 grid place-items-center">{renderDashboard()}</div>;
}
