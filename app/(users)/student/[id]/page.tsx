import React, { Suspense } from "react";
import EventScheduler from "./EventScheduler";
import LoadScreen from "./LoadScreen";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div>
      <h1 className="pageHeader">Student Dashboard</h1>
      <div>
        <Suspense fallback={<LoadScreen />}>
          <EventScheduler />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
