import React from "react";
import Link from "next/link";
import { TImage } from "../../../../../../typings";
import { urlFor } from "../../../../../../sanity";

interface Props {
  name: string;
  image: TImage;
}

function Hero({ name, image }: Props) {
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center overflow-hidden text-center ">
      <div className="z-20">
        <img
          src={urlFor(image).url()!}
          className={
            "relative rounded-full w-56 h-56 mx-auto object-cover mb-5"
          }
          loading={"lazy"}
        />
        <h2 className="text-lg uppercase text-gray-500 pb-2 tracking-[15px]">
          {name}
        </h2>
      </div>
    </div>
  );
}

export default Hero;
