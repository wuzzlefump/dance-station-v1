import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.Node_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};
const client = sanityClient(config);

export default async function createLesson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, dances, content, title, date } = JSON.parse(req.body);

  let theDances = dances.map((d: string) => ({
    _key: uuidv4(),
    _type: "reference",
    _ref: d,
  }));
  try {
    await client.create({
      _type: "lesson",
      title: title,
      user: {
        _type: "reference",
        _ref: user,
      },
      content: content,
      dances: theDances,
      date: date,
    });
  } catch (e) {
    return res.status(500).json({ message: "Couldn't submit Lesson", e });
  }

  return res.status(200).json({ message: "Lesson submitted" });
}
