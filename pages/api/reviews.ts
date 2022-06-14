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
      session: { user },
    } = req;
    const reviews = await client.review.findMany({
      where: {
        createdForId: user?.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, reviews });
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
