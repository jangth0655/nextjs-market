import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

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
  return res.send({ ok: true });
};

export default withHandler({
  method: ["POST"],
  handler,
  isPrivate: false,
});
