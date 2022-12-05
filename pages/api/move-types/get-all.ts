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
  const query = `*[ _type == "moveType"]{
        ...,
        danceType->{...}
        }`;

  try {
    let moveTypes = await client.fetch(query);
    return res.json(moveTypes);
  } catch (e) {
    return res.status(500).json({ message: "failed to fetch move types", e });
  }

  //   return res.status(200).json({ message: "users fetched" });
}
