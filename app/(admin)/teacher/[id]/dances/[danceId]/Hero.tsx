import React from "react";
import Link from "next/link";

interface Props {
  name: string;
}

function Hero({ name }: Props) {
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center overflow-hidden text-center">
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          {name}
        </h2>
      </div>
    </div>
  );
}

export default Hero;
