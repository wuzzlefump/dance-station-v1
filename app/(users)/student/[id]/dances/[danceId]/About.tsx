import React from "react";
import PortableText from "react-portable-text";

interface Props {
  about: any;
}

function About({ about }: Props) {
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center overflow-hidden text-center px-10">
      <h1 className="pageHeader">About</h1>
      <PortableText
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        content={about}
      />
    </div>
  );
}

export default About;
