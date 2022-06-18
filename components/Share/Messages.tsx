import { cls } from "@libs/client/cls";
import { User } from "@prisma/client";
import React from "react";

interface MessagesProps {
  messages: string;
  reversed?: boolean;
  avatar?: string;
  sendUser?: User;
}

const Messages: React.FC<MessagesProps> = ({
  avatar,
  reversed,
  messages,
  sendUser,
}) => {
  return (
    <div
      className={cls(
        "flex items-start",
        reversed ? "flex-row-reverse space-x-2 space-x-reverse" : "space-x-2"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 rounded-full bg-slate-500">
          <div></div>
        </div>
        <span className="text-sm">{sendUser?.username}</span>
      </div>

      <div className="w-1/2 rounded-md border-2 border-gray-300 p-2 text-sm text-gray-700">
        <p>{messages}</p>
      </div>
    </div>
  );
};

export default Messages;
