import React from "react";
import LoginButton from "./LoginButton";
import CheckAuth from "./CheckAuth";

interface Props {}

async function LandingPage(props: Props) {
  const {} = props;

  return (
    <CheckAuth>
      <div className="h-[100vh] flex items-center justify-center">
        <div className="flex flex-col p-10 space-y-5">
          <h1 className="text-xl text-gray-500 font-semibold">
            Welcome to your Dance Station
          </h1>
          <LoginButton />
        </div>
      </div>
    </CheckAuth>
  );
}

export default LandingPage;
