import { cls } from "@libs/client/cls";
import { Answer, User } from "@prisma/client";
import { useRouter } from "next/router";
import { Count } from "pages/community";
import { UserWithAnswer } from "pages/community/[id]";
import React from "react";
import { useSWRConfig } from "swr";

interface PostItemProps {
  detail?: boolean;
  id?: number;
  question?: string;
  user?: User;
  answer?: UserWithAnswer[];
  _count?: Count;

  //onWondering?: () => any;
}

const PostItem: React.FC<PostItemProps> = ({
  detail,
  user,
  answer,
  id,
  question,
  _count,
}) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  /* const wonderUpdate = (prev: any) => {
    if (!prev) return;
    return {
      ...prev,
      post: {
        ...prev.post,
        _count: {
          ...prev.post._count,
          wonderings: isWondering
            ? prev.post._count.wonderings - 1
            : prev.post._count.wonderings + 1,
        },
      },
    };
  }; */
  /*  const onWonder = (id?: number) => {
    if (loading) return;
    wonder({});
    if (!id) return;
    mutate(
      `/api/posts/${id}/wonder`,
      (prev: any) =>
        prev && {
          ...prev,
          post: {
            ...prev.post,
            _count: {
              ...prev.post._count,
              wonderings: isWondering
                ? prev.post._count.wonderings - 1
                : prev.post._count.wonderings + 1,
            },
          },
        },
      false
    );
  }; */

  const onCommunityDetail = (id?: number) => {
    router.push(`/community/${id}`);
  };

  return (
    <>
      <div className="mb-10">
        <span
          onClick={() => onCommunityDetail(id)}
          className="mb-2 inline-block cursor-pointer rounded-md bg-slate-600 px-2 py-1 text-sm text-white"
        >
          Question
        </span>

        <div className="mb-4 flex items-center">
          <div className="mr-2">
            <div className="h-6 w-6 rounded-full bg-slate-500"></div>
          </div>
          <div className="flex flex-col text-sm text-gray-500">
            <span>{user?.username}</span>
            <span>view profile &rarr;</span>
          </div>
        </div>

        <div className="space-x-2">
          <span className="text-lg font-bold text-gray-700">Q.</span>
          <span className="text-gray-700">{question}</span>
        </div>

        <div className="my-4 h-[1px] w-full bg-gray-200"></div>

        <div className="flex space-x-4 text-xs text-gray-700">
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cls("h-5 w-5 cursor-pointer")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>궁금해요</span>
            <span>{_count?.wonderings}</span>
          </div>

          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>답변 </span>
            <span>{_count?.answer}</span>
          </div>
        </div>

        <div className="my-4 h-[2px] w-full bg-gray-300"></div>
      </div>
    </>
  );
};
export default PostItem;
