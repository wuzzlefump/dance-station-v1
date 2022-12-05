"use client";
import { Scheduler } from "@aldabil/react-scheduler";
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";
import { TEvent } from "../../../../typings";

interface Props {}

const getEvents = async () => {
  let events = await fetch("/api/event/get-all");
  const result = await events.json();
  return result;
};

const getUsers = async () => {
  let users = await fetch("/api/user/get-all");
  const result = await users.json();
  return result;
};

function EventScheduler(props: Props) {
  const [showSchedule, setShowSchedule] = useState<undefined | boolean>(
    undefined
  );
  const {} = props;

  const users = use(getUsers());
  const events = use(getEvents());
  const { data } = useSession();
  useEffect(() => {
    if (!showSchedule) {
      setShowSchedule(true);
    }
  }, [showSchedule]);

  let currentUser = users.filter((x: any) => {
    //@ts-ignore
    return x._id === data?.user?.id;
  });

  let userEvents = () => {
    console.log(currentUser[0]);
    console.log(events);
    let userSpecificEvents = events.filter((event: TEvent) => {
      //@ts-ignore
      return currentUser[0]?._id === event?.user?._id;
    });

    let generalEvents = events.filter((event: TEvent) => {
      //@ts-ignore
      return !event?.user || event?.user?._id === "none";
    });

    return [...userSpecificEvents, ...generalEvents];
  };

  return (
    <div>
      {showSchedule && (
        <Scheduler
          draggable={false}
          editable={false}
          deletable={false}
          //   day={null}
          //   month={null}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 9,
            endHour: 23,
            step: 60,
            cellRenderer: ({ height, start, onClick, ...props }) => {
              // Fake some condition up
              const hour = start.getHours();
              const disabled = true;
              const restProps = disabled ? {} : props;
              return (
                <button
                  style={{
                    height: "100%",
                    background: disabled ? "#eee" : "transparent",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (disabled) {
                      return alert("Opss");
                    }
                    onClick();
                  }}
                  // disableRipple={disabled}
                  disabled={disabled}
                  {...restProps}
                ></button>
              );
            },
          }}
          resourceViewMode={"default"}
          view={"week"}
          events={userEvents().map((x: TEvent) => ({
            ...x,
            end: new Date(x.end),
            start: new Date(x.start),
            user: x?.user?._id,
            event_id: x._id,
          }))}
          // onConfirm={handleConfirm}
          onDelete={async (deletedId) => console.log(deletedId)}
        />
      )}
    </div>
  );
}

export default EventScheduler;
