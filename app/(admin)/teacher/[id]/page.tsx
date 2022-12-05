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

export async function generateStaticParams() {
  let res = await fetch(`${process.env.BASE_URL}/api/user/get-all`);
  const users: TUser[] = await res.json();

  //because rate limit

  return users.filter((x) => x.admin === true).map((x) => ({ id: x._id }));
}
