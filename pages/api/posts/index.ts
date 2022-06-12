import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  try {
    const {
      body: { question },
      session: { user },
    } = req;
    if (req.method === "GET") {
      const posts = await client.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
          _count: {
            select: {
              answer: true,
              wonderings: true,
            },
          },
        },
      });
      return res.status(200).json({ ok: true, posts });
    }

    if (req.method === "POST") {
      const post = await client.post.create({
        data: {
          question,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      return res.status(201).json({ ok: true, post });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ok: false, error: `${e}` });
  }
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
