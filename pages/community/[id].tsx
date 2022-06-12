import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import ShareTextArea from "@components/Share/ShareTextArea";
import { cls } from "@libs/client/cls";
import useMutation from "@libs/client/mutation";
import useUser from "@libs/client/useUser";
import { Answer, Post, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Count } from ".";

export interface UserWithAnswer extends Answer {
  user: User;
}

interface UserWithAnswerWithPost extends Post {
  user: User;
  answer: UserWithAnswer[];
  _count: Count;
}

interface CommunityDetailProps {
  post: UserWithAnswerWithPost;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerMutation {
  ok: boolean;
  newAnswer: Answer;
}

const CommunityDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<CommunityDetailProps>(
    router.query.id && `/api/posts/${router.query.id}`
  );
  const [sendAnswer, { loading: answerLoading, data: answerData }] =
    useMutation<AnswerMutation>(
      router.query.id && `/api/posts/${router.query.id}/answers`
    );

  const [wonder, { loading }] = useMutation(
    router.query.id && `/api/posts/${router.query.id}/wonder`
  );
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const onValid = (data: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(data);
  };

  const onWondering = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            wonderings: data.isWondering
              ? data?.post._count.wonderings - 1
              : data?.post._count.wonderings + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!loading) {
      wonder({});
    }
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      mutate();
      reset();
    }
  }, [answerData, reset, mutate]);

  return (
    <Layout back={true} title={`${data?.post.user.username}' Community`}>
      <div className="mb-10">
        <span className="mb-2 inline-block cursor-pointer rounded-md bg-slate-600 px-2 py-1 text-sm text-white">
          Question
        </span>

        <div className="mb-4 flex items-center">
          <div className="mr-2">
            <div className="h-6 w-6 rounded-full bg-slate-500"></div>
          </div>
          <div className="flex flex-col text-sm text-gray-500">
            <span>{data?.post.user.username}</span>
            <span>view profile &rarr;</span>
          </div>
        </div>

        <div className="space-x-2">
          <span className="text-lg font-bold text-gray-700">Q.</span>
          <span className="text-gray-700">{data?.post.question}</span>
        </div>

        <div className="my-4 h-[1px] w-full bg-gray-200"></div>

        <div className="flex space-x-4 text-xs text-gray-700">
          <div className="flex items-center space-x-1">
            <svg
              onClick={() => onWondering()}
              xmlns="http://www.w3.org/2000/svg"
              className={cls(
                "h-5 w-5 cursor-pointer",
                data?.isWondering ? "text-blue-800" : "text-gray-500"
              )}
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
            <span>{data?.post._count?.wonderings}</span>
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
            <span>{data?.post._count?.answer}</span>
          </div>
        </div>

        <div className="my-4 h-[2px] w-full bg-gray-300"></div>

        {data?.post.answer?.map((item) => (
          <div key={item.id} className="2">
            <div className="mb-4 flex items-center">
              <div className="mr-2">
                <div className="h-6 w-6 rounded-full bg-slate-500"></div>
              </div>
              <div className="flex space-x-6  text-sm text-gray-500">
                <span>{item.user.username}</span>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit(onValid)}>
          <ShareTextArea register={register("answer", { required: true })} />
          <div className="mt-2">
            <ShareButton text="Submit" loading={answerLoading} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityDetail;
