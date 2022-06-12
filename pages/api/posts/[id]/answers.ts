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
      query: { id },
      body: { answer },
      session: { user },
    } = req;
    const existsPost = await client.post.findFirst({
      where: {
        id: +id,
      },
      select: {
        id: true,
      },
    });
    if (!existsPost) {
      return res.json({ ok: false, error: "Could not found Post." });
    }

    const newAnswer = await client.answer.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id,
          },
        },
        answer,
      },
    });
    return res.status(200).json({ ok: true, newAnswer });
  } catch (e) {
    console.log(e);
    res.status(500).json({ ok: false, error: `${e}` });
  }
};

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
