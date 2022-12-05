"use client";
import Select from "react-select";
import React, { use, useState } from "react";
import { TDanceType, TUser } from "../../../../../../typings";

interface Props {}
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

function AddConceptToUser(props: Props) {
  let users = use(getUsers());
  const userOptions = users.map((u) => ({ label: u.username, value: u._id }));

  let dances = use(getDances());
  const danceOptions = dances.map((c) => ({
    label: c.name,
    value: c._id,
  }));
  let [loading, setLoading] = useState<boolean>(false);
  let [user, setUser] = useState({
    label: users[0].username,
    value: users[0]._id,
  });
  let [dance, setDance] = useState({
    label: dances[0].name,
    value: dances[0]._id,
  });
  console.log(users);
  console.log(dances);

  let handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/dances/create", {
      method: "POST",
      body: JSON.stringify({ user: user.value, danceType: dance.value }),
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
          User
          <Select
            onChange={(e) => {
              setUser({ label: e?.label!, value: e?.value! });
            }}
            options={userOptions}
            value={user}
          />
          {/* <select className="p-2 rounded-xl" /> */}
        </label>
        <label className="flex flex-col">
          Dance
          <Select
            options={danceOptions}
            value={dance}
            onChange={(e) => {
              setDance({ label: e?.label!, value: e?.value! });
            }}
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

export default AddConceptToUser;
