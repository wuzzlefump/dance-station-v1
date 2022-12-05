"use client";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import React from "react";

function BurgerMenu({ id }) {
  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      right: "36px",
      top: "20px",
    },
    bmBurgerBars: {
      background: "white",
    },

    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
      top: "72px",
    },
    bmMenu: {
      background: "whitesmoke",
      fontSize: "1.15em",
      zIndex: 200,
    },

    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <Menu right styles={styles}>
      <div className="flex flex-col space-y-5 w-[100%] pt-20 px-5">
        <div className="mx-auto">
          <Link href={`/teacher/${id}/forms/concept`}>Add Concept</Link>
        </div>
        <div className="mx-auto">
          <Link href={`/teacher/${id}/forms/move`}>Add Move</Link>
        </div>
        <div className="mx-auto">
          <Link href={`/teacher/${id}/forms/dance`}>Add Dance</Link>
        </div>
        <div className="mx-auto">
          <Link href={`/teacher/${id}/forms/lesson`}>Add Lesson Log</Link>
        </div>
        <div className="mx-auto">
          <Link href={`/teacher/${id}`}>Dashboard</Link>
        </div>
        <div className="mx-auto">
          <Link href={`/teacher/${id}/student`}>Students</Link>
        </div>
        <div className="mx-auto">
          <Link href={`/teacher/${id}/dances`}>Dances</Link>
        </div>
        <div className="mx-auto">
          <Link href={"/playlists"}>Practice Playlists</Link>
        </div>
        <div>
          <SignOutButton />
        </div>
      </div>
    </Menu>
  );
}

export default BurgerMenu;
