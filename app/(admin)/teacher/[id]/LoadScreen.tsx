import React from "react";
import Header from "./Header";
interface Props {}

function LoadScreen(props: Props) {
  const {} = props;

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <h1>Loading....</h1>
    </div>
  );
}

export default LoadScreen;
