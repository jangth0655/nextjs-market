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
      body: { message },
      query: { id },
      session: { user },
    } = req;

    const existStream = await client.stream.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
      },
    });
    if (!existStream) {
      return res
        .status(402)
        .json({ ok: false, error: "Could not found Stream" });
    }

    const streamMessage = await client.message.create({
      data: {
        message,
        user: {
          connect: {
            id: user?.id,
          },
        },
        stream: {
          connect: {
            id: +id,
          },
        },
      },
    });
    return res.status(201).json({ ok: true, streamMessage });
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
