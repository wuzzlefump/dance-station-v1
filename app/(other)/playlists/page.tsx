import React from "react";
import { TPlaylist } from "../../../typings";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface Props {}

const getPlaylists = async () => {
  let playlists = await fetch(`${process.env.BASE_URL}/api/playlist/get-all`);
  const result = await playlists.json();
  return result;
};

async function PlaylistPage(props: Props) {
  const {} = props;
  let playlists = await getPlaylists();
  console.log(playlists);

  return (
    <div className="h-screen">
      <h1 className="pageHeader">Practice Playlists</h1>
      <div className="100vh pt-5">
        {playlists.map((x: TPlaylist) => (
          <Link key={x._id} href={`/playlists/${x._id}`}>
            <div
              className={
                "flex justify-between border-t cursor-pointer hover:bg-gray-100 px-5 items-center"
              }
            >
              <h2 className="text-gray-500">{x.title}</h2>
              <MegaphoneIcon className="h-10 w-10 text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
