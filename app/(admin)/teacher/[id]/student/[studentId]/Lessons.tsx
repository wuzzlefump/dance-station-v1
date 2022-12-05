"use client";
import React, { useState } from "react";
import { TDance, TLesson } from "../../../../../../typings";
import LessonTable from "./LessonTable";

interface Props {
  lessons: TLesson[];
  dances: TDance[];
}

function Lessons({ dances, lessons }: Props) {
  const [dance, setDance] = useState("all");

  let filterLessons = (danceName: string) => {
    if (danceName === "all") {
      return lessons;
    }

    let arr: TLesson[] = [];
    lessons.forEach((l) => {
      let DanceNames = l.dances.map((d) => d.name);
      if (DanceNames.includes(danceName)) {
        arr.push(l);
      }
    });

    return arr;
  };
  let handleRadio = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    //@ts-ignore
    if (e.target.checked) {
      //@ts-ignore
      setDance(e.target.value);
      //@ts-ignore
    }
  };

  return (
    <div className="h-screen w-[100%] flex flex-col items-center justify-center p-10">
      <h1 className="pageHeader">Lessons</h1>
      <div className="flex space-x-10 mb-5">
        <label className="flex flex-col">
          All
          <input
            //@ts-ignore
            onClick={(e) => handleRadio(e)}
            value={"all"}
            type={"radio"}
            name="dance"
          />
        </label>
        {dances.length > 1 &&
          dances.map((d, k) => (
            <label key={k} className="flex flex-col">
              {d.danceType.name}
              <input
                //@ts-ignore
                onClick={(e) => handleRadio(e)}
                value={d.danceType.name}
                type={"radio"}
                name="dance"
              />
            </label>
          ))}
      </div>
      <LessonTable lessons={filterLessons(dance)} />
    </div>
  );
}

export default Lessons;
