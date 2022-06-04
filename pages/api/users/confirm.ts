import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { body: token } = req;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    select: {
      id: true,
      userId: true,
    },
  });
  if (!foundToken) {
    return res.json({ ok: false, error: "Could not found user." });
  }
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  return res.status(201).json({ ok: true });
};

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
    isPrivate: false,
  })
);
