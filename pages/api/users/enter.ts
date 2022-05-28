import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  console.log(req.body);
  return res.status(401).json({ ok: false, m: "enter", error: "Enter error" });
};

export default withHandler({
  method: ["POST"],
  handler: handler,
  isPrivate: false,
});
