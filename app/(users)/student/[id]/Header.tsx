import React from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
interface Props {
  id?: string;
}

function Header({ id }: Props) {
  return (
    <header className="p-5 bg-blue-500 z-50 sticky top-0 flex justify-between">
      <Link
        className=" px-2 py-1 bg-white text-blue-500 rounded-lg"
        href={"/student/" + id}
      >
        Home
      </Link>
      <BurgerMenu id={id} />
    </header>
  );
}

export default Header;
