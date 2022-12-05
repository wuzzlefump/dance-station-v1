import React from "react";
import Link from "next/link";
import { TDance } from "../../../../../typings";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
interface Props {
  params: {
    id: string;
  };
}

const getDances = async (studentId: string) => {
  let dances = await fetch(`${process.env.BASE_URL}/api/dances/get-all`);

  const result: TDance[] = await dances.json();
  return result.filter((d) => d.user._id === studentId);
};

async function DancesPage({ params: { id } }: Props) {
  const danceTypes = await getDances(id);
  console.log(danceTypes);

  return (
    <div>
      <h1 className="pageHeader">Dances</h1>
      <div className=" h-[100vh] pt-5">
        {danceTypes.map((dance: TDance) => (
          <Link key={dance._id} href={`/student/${id}/dances/${dance._id}`}>
            <div
              className={
                "flex justify-between border-t cursor-pointer hover:bg-gray-100 px-5 items-center"
              }
            >
              <h2 className="text-gray-500">{dance.danceType.name}</h2>
              <ArrowRightIcon className="h-10 w-10 text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DancesPage;
