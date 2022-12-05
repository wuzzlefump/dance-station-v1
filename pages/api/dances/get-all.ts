import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.Node_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function getAllPlaylists(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = `*[ _type == "dance"]{
    ...,
        danceType->{...,
        playlist->{...,
        songs[]->{...}}},
        user->{...}
        }`;

  try {
    let dances = await client.fetch(query);
    return res.json(dances);
  } catch (e) {
    return res.status(500).json({ message: "failed to fetch Dances", e });
  }

  //   return res.status(200).json({ message: "users fetched" });
}
