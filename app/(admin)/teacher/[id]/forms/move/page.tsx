"use client";
import Select from "react-select";
import React, { use, useState } from "react";
import { TMovesType, TUser } from "../../../../../../typings";

interface Props {}

let getUsers = async () => {
  let users = await fetch(`/api/user/get-all`);
  const result: TUser[] = await users.json();
  return result.filter((u) => u.admin == false);
};

const getMoves = async () => {
  let moves = await fetch(`/api/move-types/get-all`);
  const result: TMovesType[] = await moves.json();
  return result;
};

function AddMoveToUser(props: Props) {
  let moves = use(getMoves());
  let users = use(getUsers());

  const userOptions = users.map((u) => ({ label: u.username, value: u._id }));

  const moveOptions = moves.map((u) => ({ label: u.title, value: u._id }));

  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState({
    label: users[0].username,
    value: users[0]._id,
  });

  const [move, setMove] = useState({
    label: moves[0].title,
    value: moves[0]._id,
  });

  let handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/moves/create", {
      method: "POST",
      body: JSON.stringify({ user: user.value, moveType: move.value }),
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
          Move
          <Select
            options={moveOptions}
            value={move}
            onChange={(e) => {
              setMove({ label: e?.label!, value: e?.value! });
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

export default AddMoveToUser;
