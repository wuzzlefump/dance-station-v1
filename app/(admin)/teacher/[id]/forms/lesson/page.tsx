"use client";
import Select, { components, MultiValueGenericProps } from "react-select";
import React, { use, useState } from "react";
import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
//@ts-ignore
import Tooltip from "@atlaskit/tooltip";
import { TDanceType, TUser } from "../../../../../../typings";

interface Props {}
export interface ColourOption {
  readonly value: string;
  readonly label: string;
  //   readonly color: string;
  //   readonly isFixed?: boolean;
  //   readonly isDisabled?: boolean;
}

const MultiValueContainer = (props: MultiValueGenericProps<ColourOption>) => {
  return (
    <Tooltip content={"Customise your multi-value container!"}>
      <components.MultiValueContainer {...props} />
    </Tooltip>
  );
};

let getUsers = async () => {
  let users = await fetch(`/api/user/get-all`);
  const result: TUser[] = await users.json();
  return result.filter((u) => u.admin == false);
};

const getDances = async () => {
  let users = await fetch(`/api/dance-types/get-all`);
  const result: TDanceType[] = await users.json();
  return result;
};

function AddLessonLog(props: Props) {
  const users = use(getUsers());
  const dances = use(getDances());

  const danceOptions = dances.map((c) => ({
    label: c.name,
    value: c._id,
  }));
  const userOptions = users.map((u) => ({
    label: u.username!,
    value: u._id!,
  }));
  const [loading, setLoading] = useState<boolean>(false);
  const [dateValue, onDateChange] = useState(new Date());
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<{ label: string; value: string }[]>(
    []
  );
  const [user, setUser] = useState<{ label: string; value: string }>({
    label: users[0].username!,
    value: users[0]._id!,
  });
  const [content, setContent] = useState<string>("");

  //   const handleSubmit = () => {
  //     console.log({
  //       dateValue,
  //       title,
  //       user,
  //       content,
  //       subject,
  //     });
  //   };

  let handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/lessons/create", {
      method: "POST",
      body: JSON.stringify({
        user: user.value,
        dances: subject.map((s) => s.value),
        date: dateValue?.toLocaleString(),
        title: title,
        content: content,
      }),
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-5 ">
      <div
        className="border
	  p-20 rounded-xl flex flex-col space-y-5"
      >
        <label className="flex flex-col">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-md"
          />
        </label>

        <label className="flex flex-col">
          User
          <Select
            value={user}
            onChange={(e) => setUser(e!)}
            options={userOptions}
          />
        </label>
        <label className="flex flex-col">
          Date
          <DatePicker onChange={onDateChange} value={dateValue} />
        </label>
        <label className="flex flex-col">
          Subject / Dances
          <Select
            options={danceOptions}
            value={subject}
            //@ts-ignore
            onChange={(e) => setSubject(e)}
            isMulti
            components={{ MultiValueContainer }}
            styles={{
              multiValue: (base) => ({
                ...base,
                border: `2px solid black`,
              }),
            }}
          />
        </label>
        <label className="flex flex-col">
          Content
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="border min-h-[200px] p-2 rounded-xl"
          />
        </label>
        <div className="w-[100%] flex justify-center">
          <button
            className="border p-3 rounded-xl text-white bg-blue-500 hover:bg-blue-600 "
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLessonLog;
