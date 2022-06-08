import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { body: username } = req;

  const existUser = await client.user.findUnique({
    where: {
      username,
    },
    select: { id: true },
  });
  if (!existUser) {
    return res.send({
      ok: false,
      error: "Username is incorrect or already taken.",
    });
  }

  req.session.user = {
    id: existUser.id,
  };
  await req.session.save();
  return res.status(200).json({ ok: true });
};

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
    isPrivate: false,
  })
);
