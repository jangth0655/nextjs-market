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
    } = req;
    const stream = await client.stream.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        messages: {
          select: {
            id: true,
            message: true,
            user: {
              select: {
                username: true,
                id: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    if (!stream) {
      return res
        .status(404)
        .json({ ok: false, error: "Could not found stream." });
    }
    return res.status(200).json({ ok: true, stream });
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
