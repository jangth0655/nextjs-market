import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  console.log(req.body);
  return res.send({ ok: true, m: "login", error: "error" });
};

export default withHandler({
  method: ["POST"],
  handler,
  isPrivate: false,
});
