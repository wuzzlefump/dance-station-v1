"use client";
import React from "react";
import { signOut } from "next-auth/react";

interface Props {}

function SignOutButton(props: Props) {
  const {} = props;

  return (
    <button
      className="bg-white text-blue-500 px-2 py-1 
	  rounded-lg"
      onClick={() => signOut()}
    >
      {" "}
      Sign Out
    </button>
  );
}

export default SignOutButton;
