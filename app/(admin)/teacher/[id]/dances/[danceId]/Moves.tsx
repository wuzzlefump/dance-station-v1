import React from "react";
import { TMovesType } from "../../../../../../typings";
import MovesTable from "./MovesTable";

interface Props {
  currentMoves: TMovesType[];
}

function Moves({ currentMoves }: Props) {
  const beginnerMoves = currentMoves.filter((m) => m.level === "beginner");
  const sfMoves = currentMoves.filter((m) => m.level === "social foundations");
  const preMoves = currentMoves.filter((m) => m.level === "pre bronze");
  const intMoves = currentMoves.filter((m) => m.level === "int bronze");
  const srbMoves = currentMoves.filter((m) => m.level === "sr bronze");
  const fbMoves = currentMoves.filter((m) => m.level === "final bronze");
  const aboveMoves = currentMoves.filter((m) => m.level === "final bronze");

  return (
    <div className="h-screen p-10 flex flex-col justify-center items-center">
      <div className="relative top-20 md:top-5 w-full flex overflow-y-hidden overflow-x-scroll snap-x snap-mandatory z-20 ">
        {/* beginner */}
        <MovesTable moves={beginnerMoves} />
        {/* sf */}
        <MovesTable moves={sfMoves} />
        {/* pre bronze */}
        <MovesTable moves={preMoves} />
        {/* int bronze */}
        <MovesTable moves={intMoves} />
        {/* sen bronze */}
        <MovesTable moves={srbMoves} />
        {/* fin bronze */}
        <MovesTable moves={fbMoves} />
        {/*above bronze*/}
        <MovesTable moves={aboveMoves} />
      </div>
    </div>
  );
}

export default Moves;
