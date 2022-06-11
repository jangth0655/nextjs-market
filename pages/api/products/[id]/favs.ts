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
      session: { user },
    } = req;
    const existProduct = await client.product.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
      },
    });
    if (!existProduct) {
      return res
        .status(402)
        .json({ ok: false, error: "Could not found product." });
    }
    const alreadyExists = await client.fav.findFirst({
      where: {
        productId: +id,
        userId: user?.id,
      },
    });
    if (alreadyExists) {
      await client.fav.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await client.fav.create({
        data: {
          product: {
            connect: {
              id: +id,
            },
          },
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    }
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
