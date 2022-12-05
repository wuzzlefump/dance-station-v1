import React from "react";
import {
  TConceptsType,
  TDanceType,
  TMovesType,
  TUser,
} from "../../../../../../typings";
import About from "./About";
import Concepts from "./Concepts";
import Hero from "./Hero";
import History from "./History";
import Moves from "./Moves";
import Playlist from "./Playlist";

interface Props {
  params: {
    id: string;
    danceId: string;
  };
}

const getDance = async (danceId: string) => {
  let dances = await fetch(
    `${process.env.BASE_URL}/api/dance-types/get-one/${danceId}`
  );
  const result = await dances.json();
  return result;
};

const getMoveTypes = async (danceTypeId: string) => {
  let moves = await fetch(`${process.env.BASE_URL}/api/move-types/get-all`);
  const result = await moves.json();

  return result.filter((r: TMovesType) => r?.danceType?._id === danceTypeId);
};

const getconceptTypes = async (danceTypeId: string) => {
  let concepts = await fetch(
    `${process.env.BASE_URL}/api/concept-types/get-all`
  );
  const result = await concepts.json();

  return result.filter((r: TConceptsType) => r?.danceType?._id === danceTypeId);
};

async function DanceBackground({ params: { id, danceId } }: Props) {
  const currentDance = await getDance(danceId);
  const currentMoves = await getMoveTypes(danceId);
  const currentConcepts = await getconceptTypes(danceId);
  console.log(currentMoves);
  console.log({ currentDance });
  return (
    <div className=" h-screen  snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden">
      <section id={"hero"} className={"snap-start"}>
        <Hero name={currentDance.name} />
      </section>
      <section id={"history"} className={"snap-start"}>
        <History image={currentDance?.image} history={currentDance?.history} />
      </section>
      <section id={"about"} className={"snap-center"}>
        <About about={currentDance?.description} />
      </section>
      <section id={"moves"} className={"snap-start"}>
        <Moves currentMoves={currentMoves} />
      </section>
      <section id={"concepts"} className={"snap-start"}>
        <Concepts conceptTypes={currentConcepts} />
      </section>
      <section id={"playlist"} className={"snap-center"}>
        <Playlist playlist={currentDance?.playlist} />
      </section>
    </div>
  );
}

export default DanceBackground;
