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

    const product = await client.product.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            avatar: true,
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    if (!product) {
      return res.status(404).json({ ok: false, error: "Could not found." });
    }
    const terms = product.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));

    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: product.id,
          },
        },
      },
    });

    const isLiked = Boolean(
      await client.fav.findFirst({
        where: {
          productId: product.id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    return res
      .status(200)
      .json({ ok: true, product, relatedProducts, isLiked });
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
