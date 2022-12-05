import React from "react";
import { urlFor } from "../../../../../../sanity";
import { TImage } from "../../../../../../typings";
import PortableText from "react-portable-text";

interface Props {
  history: any;
  image: TImage;
}

function History({ image, history }: Props) {
  return (
    <div className="h-screen flex flex-col relative text-center md:text-left md:flex-row max-w-7xl p-10 justify-evenly mx-auto items-center">
      <img
        src={urlFor(image).url()!}
        className="-mb-8 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />
      <div className=" space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-gray-500">little</span> History
        </h4>
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={history}
        />
      </div>
    </div>
  );
}

export default History;
