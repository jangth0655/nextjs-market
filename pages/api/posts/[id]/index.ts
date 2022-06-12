import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  try {
    const {
      query: { id },
      session: { user },
    } = req;
    const post = await client.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        answer: {
          select: {
            answer: true,
            id: true,
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            answer: true,
            wonderings: true,
          },
        },
      },
    });
    const isWondering = Boolean(
      await client.wondering.findFirst({
        where: {
          postId: post?.id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );
    if (!post) {
      return res
        .status(404)
        .json({ ok: false, error: "Could not found post." });
    }
    return res.status(200).json({ ok: true, post, isWondering });
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
