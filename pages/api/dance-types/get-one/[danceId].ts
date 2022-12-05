import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
import { TDanceType } from "../../../../typings";

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
  const query = `*[ _type == "danceType"]{
        ...,
        playlist->{...,
		songs[]->{...}}
        }`;

  try {
    let danceTypes = await client.fetch(query);
    let filteredDanceTypes = req.query.danceId
      ? danceTypes.find((dance: TDanceType) => dance._id === req.query.danceId)
      : danceTypes[0];
    return res.json(filteredDanceTypes);
  } catch (e) {
    return res.status(500).json({ message: "failed to fetch Dance Type", e });
  }
}
