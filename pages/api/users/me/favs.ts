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

    const favs = await client.fav.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        product: {
          select: {
            id: true,
            image: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, favs });
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
