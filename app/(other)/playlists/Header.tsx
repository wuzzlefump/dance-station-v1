import React from "react";
import Link from "next/link";
import { TSession } from "../../../typings";

interface Props {
  session?: TSession;
}

function Header({ session }: Props) {
  return (
    <header className="p-5 bg-blue-500 z-50 sticky top-0 flex justify-between">
      <Link className=" px-2 py-1 bg-white text-blue-500 rounded-lg" href="/">
        Home
      </Link>
    </header>
  );
}

export default Header;
