import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
import test from "node:test";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.Node_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};
const client = sanityClient(config);

export default async function editEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, start, end, user, _id } = JSON.parse(req.body);

  console.log("editing");

  try {
    let event = await client.patch(_id, {
      set: {
        start: start.toString(),
        end: end.toString(),
        user: {
          _type: "reference",
          _ref: user,
        },
        title: title,
      },
    });

    console.log("edited?");
    console.log(event);
    return res.json(event);
  } catch (e) {
    return res.status(500).json({ message: "Couldn't submit event", e });
  }
}
