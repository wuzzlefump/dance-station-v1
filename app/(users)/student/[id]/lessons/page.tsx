import React from "react";
import { TLesson } from "../../../../../typings";
import Table from "./Table";

interface Props {
  params: {
    id: string;
  };
}

const getLessons = async (studentId: string) => {
  let concepts = await fetch(`${process.env.BASE_URL}/api/lessons/get-all`);
  const result: TLesson[] = await concepts.json();
  return result.filter((r) => r?.user?._id === studentId);
};

async function LessonOverview({ params: { id } }: Props) {
  let lessons = await getLessons(id);

  return (
    <div className="h-screen w-screen p-10 flex flex-col space-y-5 items-center justify-center">
      <h1 className="pageHeader">Lessons</h1>
      <div>
        <Table lessons={lessons} id={id} />
      </div>
    </div>
  );
}

export default LessonOverview;
