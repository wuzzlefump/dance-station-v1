"use client";

import React, { useEffect, useState } from "react";
import { TDance, TMove } from "../../../../../../typings";
import MovesTable from "./MovesTable";

interface Props {
  moves: TMove[];
  dances: TDance[];
}

function Moves({ moves, dances }: Props) {
  const [dance, setDance] = useState<string>(
    dances.length > 0 ? dances[0].danceType._id : ""
  );

  const filterMoves = (danceId: string) => {
    return moves.filter((m) => {
      return m?.moveType?.danceType?._id === danceId;
    });
  };

  let handleRadio = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    //@ts-ignore
    if (e.target.checked) {
      //@ts-ignore
      setDance(e.target.value);
      //@ts-ignore
    }
  };

  useEffect(() => {
    console.log(dances);
  }, []);
  return (
    <div className="h-screen w-[100%] flex flex-col items-center justify-center">
      <h1 className="pageHeader">Moves </h1>
      <div className="flex space-x-10 mb-5">
        {dances.length > 1 &&
          dances.map((d, k) => (
            <label key={k} className="flex flex-col">
              {d.danceType.name}
              <input
                //@ts-ignore
                onClick={(e) => handleRadio(e)}
                value={d.danceType._id}
                type={"radio"}
                name="dance"
              />
            </label>
          ))}
      </div>
      <MovesTable moves={filterMoves(dance)} />{" "}
    </div>
  );
}

export default Moves;
