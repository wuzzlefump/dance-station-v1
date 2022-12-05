"use client";
import { signIn } from "next-auth/react";

interface Props {}

function LoginButton(props: Props) {
  const {} = props;

  return (
    <button
      onClick={() => signIn()}
      className=" border max-w-[100px] mx-auto px-3  py-1 rounded hover:bg-gray-300"
    >
      Login
    </button>
  );
}

export default LoginButton;
