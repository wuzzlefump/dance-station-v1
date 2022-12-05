import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="h-screen w-[100%] flex flex-col items-center justify-center">
      <p>Loading....</p>
    </div>
  );
}

export default Loading;
