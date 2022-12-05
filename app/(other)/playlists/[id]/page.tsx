import React from "react";
import PlaylistBody from "./PlaylistBody";
import { TPlaylist } from "../../../../typings";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const getPlaylists = async (id: string) => {
  let playlists = await fetch(`${process.env.BASE_URL}/api/playlist/get-all`);
  const result = await playlists.json();
  let res = result.filter((x: TPlaylist) => x._id === id);

  return res ? res[0] : result[0];
};

async function Playlist({ params: { id } }: Props) {
  let playlist = await getPlaylists(id);
  console.log(playlist);
  return (
    <div>
      <h1 className={"pageHeader"}>{playlist.title}</h1>
      <PlaylistBody playlist={playlist} />
      <div className=" text-center text-xl text-blue-400 underline p-5">
        <Link href={"/playlists"}>Back</Link>
      </div>
    </div>
  );
}

export default Playlist;
