"use client";
import { Scheduler } from "@aldabil/react-scheduler";
import {
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { useSession } from "next-auth/react";
import { use } from "react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { TEvent, TUser } from "../../../../typings";
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

const createEvent = async (data: {
  user: string;
  start: Date | string;
  end: Date | string;
  title: string;
}) => {
  let event = await fetch("/api/event/create-event", {
    method: "POST",
    body: JSON.stringify(data),
  });

  let result = await event.json();
  return result;
};

const EditEvent = async (data: {
  _id: string;
  user: string;
  start: Date | string;
  end: Date | string;
  title: string;
}) => {
  let event = await fetch("/api/event/edit-event", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  let result = await event.json();
  return result;
};

const deleteEvent = async (key: string): Promise<string> => {
  if (!key) {
    return "error";
  } else {
    try {
      await fetch("/api/event/delete", {
        method: "DELETE",
        body: JSON.stringify({ key }),
      }).then((response) => response.json);
      return "Deleted";
    } catch (e) {
      return "error";
    }
  }
};

function EventScheduler(props: Props) {
  const users = use(getUsers());
  const events = use(getEvents());
  const router = useRouter();
  const { data } = useSession();
  let currentUser = users.filter((x: any) => {
    //@ts-ignore
    return x._id === data?.user?.id;
  });

  const [showSchedule, setShowSchedule] = useState<undefined | boolean>(
    undefined
  );
  const {} = props;
  useEffect(() => {
    if (!showSchedule) {
      setShowSchedule(true);
    }
  }, [showSchedule]);

  interface CustomEditorProps {
    scheduler: SchedulerHelpers;
  }
  const CustomEditor = ({ scheduler }: CustomEditorProps) => {
    const event = scheduler.edited;
    // console.log(scheduler);

    // Make your own form/state
    const [state, setState] = useState<{ title: string; user: string }>({
      title: event?.title || "",
      user: event?.user || "",
    });

    const handleChange = (value: string, name: string) => {
      setState((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };
    const handleSubmit = async () => {
      // Your own validation

      try {
        scheduler.loading(true);

        /**Simulate remote data saving */
        const added_updated_event = (await new Promise(async (res) => {
          /**
           * Make sure the event have 4 mandatory fields
           * event_id: string|number
           * title: string
           * start: Date|string
           * end: Date|string
           */

          if (!event) {
            let newEvent = await createEvent({
              title: state.title,
              start: scheduler.state.start.value,
              end: scheduler.state.end.value,
              user: state.user,
            });
            // console.log(newEvent);
            res({
              event_id: newEvent?._id,
              title: newEvent?.title,
              start: new Date(newEvent?.start),
              end: new Date(newEvent?.end),
              user: newEvent?.user?._ref,
            });
          } else {
            console.log(scheduler);
            let newEvent = await EditEvent({
              _id: scheduler.state.event_id.value,
              title: state.title,
              start: scheduler.state.start.value,
              end: scheduler.state.end.value,
              user: state.user,
            });
            console.log(newEvent);
            res({
              event_id: newEvent?.id,
              title: newEvent?.set?.title,
              start: new Date(newEvent?.set?.start),
              end: new Date(newEvent?.set?.end),
              user: newEvent?.set?.user?._ref,
            });
          }
        })) as ProcessedEvent;

        scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
        scheduler.close();
      } finally {
        scheduler.loading(false);
      }
    };
    return (
      <div className="p-10 rounded-lg">
        <div>
          <p className="mx-auto text-center font-semibold border-b pb-2 text-gray-500 text-xl">
            Create Yout Event
          </p>
          <div className="flex flex-col space-y-5 items-center pt-6">
            <label className="flex flex-col">
              Title
              <input
                className="border rounded-xl p-3 bg-gray-100 min-w-[250px]"
                placeholder="Title"
                value={state.title}
                onChange={(e) => handleChange(e.target.value, "title")}
                type="text"
              />
            </label>
            <label className="flex flex-col">
              Student
              <select
                onChange={(e) => handleChange(e.target.value, "user")}
                value={state.user}
                className="border rounded-xl p-3 bg-gray-100 min-w-[250px]"
              >
                <option value={"none"}> </option>
                {users
                  .filter((student: TUser) => student.admin === false)
                  .map((student: any) => {
                    return (
                      <option key={student._id} value={student._id}>
                        {student.username}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
        </div>
        <div className="flex items-center p-2 justify-between">
          <button
            className=" p-3 border rounded-xl hover:bg-gray-200"
            onClick={scheduler.close}
          >
            Cancel
          </button>
          <button
            className=" p-3 border rounded-xl bg-blue-500 hover:bg-white hover:text-blue-400"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showSchedule && (
        <Scheduler
          draggable={false}
          resourceViewMode={"default"}
          editable={false}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            step: 60,
            weekStartOn: 6,
            startHour: 9,
            endHour: 23,
          }}
          customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
          view={"week"}
          events={events.map((x: TEvent) => ({
            ...x,
            end: new Date(x.end),
            start: new Date(x.start),
            user: x?.user?._id,
            event_id: x._id,
          }))}
          // onConfirm={handleConfirm}
          onDelete={async (deletedId) => {
            await deleteEvent(deletedId.toString());
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

export default EventScheduler;
