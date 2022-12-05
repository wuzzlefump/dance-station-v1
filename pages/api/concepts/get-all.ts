import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.Node_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function getAllConcepts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = `*[ _type == "concept"]{
        ...,
        user->{...},
        conceptType->{...,
        danceType->{...,
        playlist->{...,
        songs[]->{...},},},
},
        }`;

  try {
    let conceptTypes = await client.fetch(query);
    return res.json(conceptTypes);
  } catch (e) {
    return res.status(500).json({ message: "failed to fetch move types", e });
  }

  //   return res.status(200).json({ message: "users fetched" });
}
