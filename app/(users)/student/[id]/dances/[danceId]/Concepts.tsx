import React from "react";
import { TConceptsType } from "../../../../../../typings";
import ConceptTable from "./ConceptTable";

interface Props {
  conceptTypes: TConceptsType[];
}

function Concepts({ conceptTypes }: Props) {
  const beginnerMoves = conceptTypes.filter((m) => m.level === "beginner");
  const sfMoves = conceptTypes.filter((m) => m.level === "social foundations");
  const preMoves = conceptTypes.filter((m) => m.level === "pre bronze");
  const intMoves = conceptTypes.filter((m) => m.level === "int bronze");
  const srbMoves = conceptTypes.filter((m) => m.level === "sr bronze");
  const fbMoves = conceptTypes.filter((m) => m.level === "final bronze");
  const aboveMoves = conceptTypes.filter((m) => m.level === "final bronze");
  return (
    <div className="h-screen p-10 flex flex-col justify-center items-center">
      <div className="relative top-20 md:top-5 w-full flex overflow-y-hidden overflow-x-scroll snap-x snap-mandatory z-20 ">
        {/* beginner */}
        <ConceptTable concepts={beginnerMoves} />
        {/* sf */}
        <ConceptTable concepts={sfMoves} />
        {/* pre bronze */}
        <ConceptTable concepts={preMoves} />
        {/* int bronze */}
        <ConceptTable concepts={intMoves} />
        {/* sen bronze */}
        <ConceptTable concepts={srbMoves} />
        {/* fin bronze */}
        <ConceptTable concepts={fbMoves} />
        {/* above */}
        <ConceptTable concepts={aboveMoves} />
      </div>
    </div>
  );
}

export default Concepts;
