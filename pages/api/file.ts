import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import axios from "axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  try {
    const response = await (
      await axios({
        method: "post",
        url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_ACCOUNT_ID}/images/v2/direct_upload`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUD_IMAGE_ID}`,
        },
      })
    ).data;

    return res.status(201).json({ ok: true, ...response.result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ ok: false, error: `${e}` });
  }
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
