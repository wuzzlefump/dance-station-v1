"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {}

function SignOutButton(props: Props) {
  const router = useRouter();
  return (
    <button
      className="bg-[inherit] text-blue-500 px-2 py-1 
	  rounded-lg"
      onClick={() => {
        signOut({ callbackUrl: "/" });
        // setTimeout(() => {
        //   router.push("/");
        // }, 5000);
      }}
    >
      {" "}
      Sign Out
    </button>
  );
}

export default SignOutButton;
