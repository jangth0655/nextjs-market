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
      query: { kind },
    } = req;

    if (kind === "sale") {
      const sales = await client.record.findMany({
        where: {
          userId: user?.id,
          kind: "Sale",
        },
        include: {
          product: {
            include: {
              _count: {
                select: {
                  favs: true,
                },
              },
            },
          },
        },
      });
      if (!sales) {
        return res.status(404).json({ ok: false });
      }
      return res.status(200).json({ ok: true, sales });
    }

    if (kind === "purchase") {
      const purchases = await client.record.findMany({
        where: {
          userId: user?.id,
          kind: "Purchase",
        },
        include: {
          product: {
            include: {
              _count: {
                select: {
                  favs: true,
                },
              },
            },
          },
        },
      });
      if (!purchases) {
        return res.status(404).json({ ok: false });
      }
      return res.status(200).json({ ok: true, purchases });
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
