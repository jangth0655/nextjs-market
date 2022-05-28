import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type Method = "GET" | "POST" | "DELETE";
type Handler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => Promise<void>;

type ConfigType = {
  method: Method[];
  handler: Handler;
  isPrivate: boolean;
};

const withHandler = ({ handler, method, isPrivate = true }: ConfigType) => {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    try {
      if (req.method && !method.includes(req.method as Method)) {
        return res
          .status(405)
          .json({ ok: false, error: "Request Method is incorrect" });
      }
      return await handler(req, res);
    } catch (e) {
      console.warn(e);
      return res.status(500).json({ ok: false, error: "Server not working" });
    }
  };
};

export default withHandler;
