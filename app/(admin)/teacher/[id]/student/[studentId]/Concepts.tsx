"use client";
import React, { useState } from "react";
import { TConcepts, TDance } from "../../../../../../typings";
import ConceptTable from "./ConceptTable";

interface Props {
  concepts: TConcepts[];
  dances: TDance[];
}

function Concepts({ concepts, dances }: Props) {
  console.log(concepts);
  const [dance, setDance] = useState(
    dances.length > 0 ? dances[0].danceType._id : ""
  );
  let handleRadio = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    //@ts-ignore
    if (e.target.checked) {
      //@ts-ignore
      setDance(e.target.value);
      //@ts-ignore
    }
  };
  let filterConcept = (danceId: string) => {
    return concepts.filter((c) => c.conceptType.danceType._id === danceId);
  };
  return (
    <div className="h-screen w-[100%] flex flex-col items-center justify-center">
      <h1 className="pageHeader">Concepts</h1>
      <div className="flex space-x-10 mb-5 ">
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
      <ConceptTable concepts={filterConcept(dance)} />
    </div>
  );
}

export default Concepts;
