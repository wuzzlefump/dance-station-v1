"use client";
import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { TPlaylist } from "../../../../typings";
interface Props {
  playlist: TPlaylist;
}

function PlaylistBody({ playlist }: Props) {
  let getAudioURl = (asset: any) => {
    const ref = asset?.asset?._ref;
    const assetRefParts = ref?.split("-");
    const id = assetRefParts ? assetRefParts[1] : undefined;
    const format = assetRefParts ? assetRefParts[2] : undefined;
    const assetUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${format}`;
    return assetUrl;
  };
  let [songIndex, setSongIndex] = useState<number>(0);
  let [song, setSong] = useState<any>(
    getAudioURl(playlist.songs[songIndex].audio)
  );

  const playNext = () => {
    const index = songIndex;

    if (index == playlist.songs.length - 1) {
      setSong(getAudioURl(playlist.songs[0].audio));
      setSongIndex(0);
    } else {
      setSong(getAudioURl(playlist.songs[index + 1].audio));
      setSongIndex(index + 1);
    }
  };

  return (
    <div className="w-[100%] h-[70vh] pt-[5vh] flex flex-col items-center justify-center">
      <h2 className={" text-lg font-semibold pb-10"}>
        {playlist.songs[songIndex].title}
      </h2>
      <ReactAudioPlayer
        src={song}
        controls
        onEnded={() => {
          playNext();
          console.log(song);
        }}
        controlsList={"nodownload"}
        autoPlay={songIndex !== 0 ? true : false}
      />

      <h1 className="text-xs font-extrabold pt-20">
        <span> Next Up:</span>
        {songIndex + 1 < playlist.songs.length &&
          playlist.songs[songIndex + 1].title}
      </h1>
    </div>
  );
}

export default PlaylistBody;
