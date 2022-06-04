import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
//import mail from "@sendgrid/mail";

//mail.setApiKey(process.env.SENDGRID_API_KEY!);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, username } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const user = await client.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return res.send({ ok: false, error: "Username or email already taken" });
  }
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            username,
          },
          create: {
            username,
            email,
          },
        },
      },
    },
  });
  return res.status(201).json({ ok: true, token });

  /*  if (email) {
    const email = await mail.send({
      from: "jangth0655@naver.com",
      to: "jangth0655@gmail.com",
      subject: "Your Star Market Verification Email",
      text: `Your token is ${token.payload}`,
      html: `<strong> Your token is ${token.payload} </strong>`,
    });
    console.log(email);
  } */
};

export default withHandler({
  method: ["POST"],
  handler: handler,
  isPrivate: false,
});
