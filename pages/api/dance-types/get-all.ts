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
  const query = `*[ _type == "danceType"]{
        ...,
        playlist->{...}
        }`;

  try {
    let danceTypes = await client.fetch(query);
    return res.json(danceTypes);
  } catch (e) {
    return res.status(500).json({ message: "failed to fetch Dance Types", e });
  }

  //   return res.status(200).json({ message: "users fetched" });
}
