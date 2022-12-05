import Link from "next/link";
import React from "react";
import { TUser } from "../../../../../typings";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface Props {
  params: {
    id: string;
  };
}

const getUsers = async () => {
  let users = await fetch(`${process.env.BASE_URL}/api/user/get-all`);
  const result: TUser[] = await users.json();
  return result.filter((u) => u.admin == false);
};

async function StudentPage({ params: { id } }: Props) {
  const users = await getUsers();
  console.log(users);
  return (
    <div>
      <h1 className="pageHeader">Students</h1>
      <div>
        {users.map((u) => (
          <Link key={u._id} href={`/teacher/${id}/student/${u._id}`}>
            <div
              className="
                flex justify-between border-t cursor-pointer hover:bg-gray-100 px-5 items-center"
            >
              <h2>{u.username}</h2>
              <ArrowRightIcon className="h-10 w-10" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudentPage;
