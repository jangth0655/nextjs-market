import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  try {
    if (req.method === "GET") {
      const products = await client.product.findMany({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              favs: true,
            },
          },
        },
      });
      if (!products) {
        return res
          .status(404)
          .json({ ok: false, error: "Could not found product." });
      }

      return res.json({
        ok: true,
        products,
      });
    }
    if (req.method === "POST") {
      const {
        body: { name, price, description },
        session: { user },
      } = req;
      const product = await client.product.create({
        data: {
          name,
          price: +price,
          description,
          image: "",
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      if (!product) {
        return res.status(401).json({ ok: false, error: "Could not upload." });
      }
      return res.status(201).json({ ok: true, product });
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
