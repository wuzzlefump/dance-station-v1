import React from "react";
import {
  TConcepts,
  TDance,
  TLesson,
  TMove,
  TUser,
} from "../../../../../../typings";
import DanceSection from "./DanceSection";
import Hero from "./Hero";
import Moves from "./Moves";
import Concepts from "./Concepts";
import Lessons from "./Lessons";
interface Props {
  params: {
    id: string;
    studentId: string;
  };
}
const getUsers = async (studentId: string) => {
  let users = await fetch(`${process.env.BASE_URL}/api/user/get-all`);
  const result: TUser[] = await users.json();
  return result
    .filter((u) => u.admin == false)
    .filter((u) => u._id === studentId);
};

const getDances = async (studentId: string) => {
  let users = await fetch(`${process.env.BASE_URL}/api/dances/get-all`);
  const result: TDance[] = await users.json();
  return result.filter((r) => r.user._id === studentId);
};

const getMoves = async (studentId: string) => {
  let moves = await fetch(`${process.env.BASE_URL}/api/moves/get-all`);
  const result: TMove[] = await moves.json();
  //
  return result.filter((r) => r?.user?._id === studentId);
};

const getConcepts = async (studentId: string) => {
  let concepts = await fetch(`${process.env.BASE_URL}/api/concepts/get-all`);
  const result: TConcepts[] = await concepts.json();
  //   console.log(result);
  return result.filter((r) => r?.user?._id === studentId);
};
const getLessons = async (studentId: string) => {
  let concepts = await fetch(`${process.env.BASE_URL}/api/lessons/get-all`);
  const result: TLesson[] = await concepts.json();
  return result.filter((r) => r?.user?._id === studentId);
};

async function StudentProfile({ params: { id, studentId } }: Props) {
  let user = await getUsers(studentId);
  let dances = await getDances(studentId);
  let moves = await getMoves(studentId);
  let concepts = await getConcepts(studentId);
  let lessons = await getLessons(studentId);
  //   console.log({
  //     moves: moves[0].user,
  //     dances,
  //     user,
  //     lessons,
  //     concepts,
  //   });

  return (
    <div className=" h-screen  snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden">
      <section id={"hero"} className={"snap-start"}>
        <Hero name={user[0].username!} image={user[0].image!} />
      </section>
      <section id={"dances"} className="snap-start">
        <DanceSection dances={dances} />
      </section>
      <section id={"concepts"} className="snap-start">
        <Concepts dances={dances} concepts={concepts} />
      </section>
      <section id={"moves"} className="snap-start">
        <Moves dances={dances} moves={moves} />
      </section>
      <section className="snap-start">
        <Lessons lessons={lessons} dances={dances} />
      </section>
    </div>
  );
}

export default StudentProfile;
