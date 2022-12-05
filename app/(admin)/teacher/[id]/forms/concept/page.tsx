"use client";
import { use, useState } from "react";
import React from "react";
import Select from "react-select";
import { TConceptsType, TUser } from "../../../../../../typings";

interface Props {}

const getUsers = async () => {
  let users = await fetch(`/api/user/get-all`);
  const result: TUser[] = await users.json();
  return result.filter((u) => u.admin == false);
};
const getConcepts = async () => {
  let concepts = await fetch(`/api/concept-types/get-all`);
  const result: TConceptsType[] = await concepts.json();
  //   console.log(result);
  return result;
};

function AddConceptToUser(props: Props) {
  let users = use(getUsers());
  const userOptions = users.map((u) => ({ label: u.username, value: u._id }));

  let concepts = use(getConcepts());
  const conceptOptions = concepts.map((c) => ({
    label: c.title,
    value: c._id,
  }));

  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({
    label: users[0].username,
    value: users[0]._id,
  });
  let [concept, setConcept] = useState({
    label: concepts[0].title,
    value: concepts[0]._id,
  });
  console.log(users);
  console.log(concepts);

  let handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/concepts/create", {
      method: "POST",
      body: JSON.stringify({ user: user.value, conceptType: concept.value }),
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
      {loading ? (
        <p>Uploading ...</p>
      ) : (
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
            Concept
            <Select
              options={conceptOptions}
              value={concept}
              onChange={(e) => {
                setConcept({ label: e?.label!, value: e?.value! });
              }}
            />
          </label>
          <div className="w-[100%] flex justify-center">
            <button
              onClick={() => handleSubmit()}
              className="border p-3 rounded-xl text-white bg-blue-500 hover:bg-blue-600 "
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddConceptToUser;
