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
      const streams = await client.stream.findMany({
        include: {
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
        },
      });
      return res.status(200).json({ ok: true, streams });
    }
    if (req.method === "POST") {
      const {
        body: { name, price, description },
        session: { user },
      } = req;
      const stream = await client.stream.create({
        data: {
          name,
          price: +price,
          description,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      return res.status(201).json({ ok: true, stream });
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
