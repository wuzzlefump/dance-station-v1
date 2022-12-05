import React from "react";
import {
  TConcepts,
  TConceptsType,
  TDance,
  TDanceType,
  TMove,
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
    `${process.env.BASE_URL}/api/dances/get-one/${danceId}`
  );
  const result: TDance = await dances.json();
  return result;
};

const getMoves = async (danceId: string, userId: string) => {
  let moves = await fetch(`${process.env.BASE_URL}/api/moves/get-all`);
  const result: TMove[] = await moves.json();
  console.log(result);

  let finalResult = result.filter((x) => x?.user?._id === userId);

  return finalResult.filter(
    (r: TMove) => r?.moveType.danceType?._id === danceId
  );
};

const getConcepts = async (danceId: string, userId: string) => {
  let concepts = await fetch(`${process.env.BASE_URL}/api/concepts/get-all`);
  const result: TConcepts[] = await concepts.json();
  let finalResult = result.filter((x) => x?.user?._id === userId);

  return finalResult.filter(
    (r: TConcepts) => r?.conceptType?.danceType?._id === danceId
  );
};

async function DanceBackground({ params: { id, danceId } }: Props) {
  const currentDance = await getDance(danceId);
  const currentMoves = await getMoves(currentDance.danceType._id, id);
  const currentConcepts = await getConcepts(currentDance.danceType._id, id);
  console.log(currentMoves);
  console.log({ currentConcepts });
  console.log({ currentDancePlaylist: currentDance.danceType.playlist });
  return (
    <div className=" h-screen  snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden">
      <section id={"hero"} className={"snap-start"}>
        <Hero name={currentDance.danceType.name} />
      </section>
      <section id={"history"} className={"snap-start"}>
        <History
          image={currentDance?.danceType?.image!}
          history={currentDance?.danceType?.history!}
        />
      </section>
      <section id={"about"} className={"snap-center"}>
        <About about={currentDance?.danceType?.description!} />
      </section>
      <section id={"moves"} className={"snap-start"}>
        <Moves currentMoves={currentMoves.map((m) => m.moveType)} />
      </section>
      <section id={"concepts"} className={"snap-start"}>
        <Concepts conceptTypes={currentConcepts.map((c) => c.conceptType)} />
      </section>
      <section id={"playlist"} className={"snap-center"}>
        <Playlist playlist={currentDance?.danceType?.playlist} />
      </section>
    </div>
  );
}

export default DanceBackground;
