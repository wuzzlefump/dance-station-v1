// "use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { TUser } from "../../../../typings";

import EventScheduler from "./EventScheduler";
import LoadScreen from "./LoadScreen";

interface Props {}

function TeacherDashboard(props: Props) {
  const {} = props;

  return (
    <div>
      <h1 className="pageHeader">Teacher Dashboard</h1>
      <Suspense fallback={<LoadScreen />}>
        <EventScheduler />
      </Suspense>
    </div>
  );
}

export default TeacherDashboard;
