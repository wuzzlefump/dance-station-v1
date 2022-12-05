import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.Node_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};
const client = sanityClient(config);

export default async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, start, end, user } = JSON.parse(req.body);

  try {
    let event = await client.create({
      _type: "event",
      start: start,
      end: end,
      user: {
        _type: "reference",
        _ref: user,
      },
      title: title,
    });

    console.log(event);
    return res.json(event);
  } catch (e) {
    return res.status(500).json({ message: "Couldn't submit event", e });
  }
}
