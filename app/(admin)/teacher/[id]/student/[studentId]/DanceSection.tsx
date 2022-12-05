import React from "react";
import { TDance } from "../../../../../../typings";
import DanceTable from "./DanceTable";
interface Props {
  dances: TDance[];
}

function DanceSection({ dances }: Props) {
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center overflow-hidden text-center px-6">
      <DanceTable dances={dances} />
    </div>
  );
}

export default DanceSection;
