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
      const {
        session: { user },
      } = req;
      const existUser = await client.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          username: true,
          id: true,
          avatar: true,
        },
      });
      if (!existUser) {
        return res
          .status(404)
          .json({ ok: false, error: "Could not found User." });
      }
      return res.status(200).json({ ok: true, profile: existUser });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ok: false, error: `${e}` });
  }
};

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
