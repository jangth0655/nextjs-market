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
          email: true,
        },
      });
      if (!existUser) {
        return res
          .status(404)
          .json({ ok: false, error: "Could not found User." });
      }
      return res.status(200).json({ ok: true, profile: existUser });
    }
    if (req.method === "POST") {
      const {
        session: { user },
        body: { email, username },
      } = req;

      const currentUser = await client.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          username: true,
          email: true,
        },
      });

      if (email && email !== currentUser?.email) {
        if (email === currentUser?.email) {
          return res.json({ ok: false, error: "Email is already taken." });
        }
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
          },
        });
        return res.status(201).json({ ok: true });
      }

      if (username && username !== currentUser?.username) {
        if (username === currentUser?.username) {
          return res.json({ ok: false, error: "Username is already taken." });
        }
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            username,
          },
        });
        return res.status(201).json({ ok: true });
      }
      return res.json({ ok: false });
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
