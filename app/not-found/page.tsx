"use client";
import React from "react";
import { notFound, useRouter } from "next/navigation";

interface Props {}

function NotFound(props: Props) {
  const {} = props;
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-xl text-gray-500 font-bold h-[100vh]">
      <p className=" cursor-pointer" onClick={() => router.push("/")}>
        404 page not found
      </p>
    </div>
  );
}

export default NotFound;
