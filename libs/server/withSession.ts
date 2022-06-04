import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption: IronSessionOptions = {
  cookieName: "starSession",
  password: process.env.PASSWORD!,
};

export const withApiSession = (handler: any) => {
  return withIronSessionApiRoute(handler, cookieOption);
};
