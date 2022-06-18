import Layout from "@components/layout";
import Messages from "@components/Share/Messages";
import useMutation from "@libs/client/mutation";
import useUser from "@libs/client/useUser";
import { Message, Stream, User } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface MessageWithUser extends Message {
  user: User;
}

interface StreamWithUser extends Stream {
  user: User;
  messages: MessageWithUser[];
}

interface StreamDetailQuery {
  ok: boolean;
  stream: StreamWithUser;
  error?: string;
}

interface MessageForm {
  message: string;
}

interface MessageMutation {
  ok: boolean;
  streamMessage: Message;
  error?: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<StreamDetailQuery>(
    router.query.id && `/api/streams/${router.query.id}`
  );

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { loading, data: sendMessageData }] =
    useMutation<MessageMutation>(
      router.query.id && `/api/streams/${router.query.id}/messages`
    );

  const onValid = (data: MessageForm) => {
    if (loading) return;
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: data.message,
                user: { ...user },
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(data);
    reset();
  };

  return (
    <Layout back={true} title={`${data?.stream?.name}' Stream`}>
      <div className="mb-4 h-96 w-full rounded-md bg-slate-700">
        <div></div>
      </div>

      <div className="flex items-center text-gray-600">
        <div className=" mr-2 h-6 w-6 rounded-full bg-slate-700"></div>
        <div className="text-xm flex flex-col">
          <span>asdf</span>
          <Link href={`/users/${data?.stream?.user?.id}/profile`}>
            <a className="cursor-pointer text-gray-500 transition-all hover:text-blue-500">
              View profile &rarr;
            </a>
          </Link>
        </div>
      </div>

      <div className="my-7 h-[0.5px] w-full bg-gray-200"></div>

      <div className="space-y-6">
        <span className="text-xl font-bold">{data?.stream?.name}</span>
        <div>
          <span>$</span>
          <span>price</span>
        </div>
        <p className="text-sm">{data?.stream?.description}</p>
      </div>

      <div className="mt-4 space-y-4">
        <h1 className="text-2xl font-bold">Live Chat</h1>
        <div className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4">
          {data?.stream.messages.map((message) => (
            <Messages
              key={message?.id}
              messages={message.message}
              reversed={message.user.id === user?.id}
              sendUser={message.user}
            ></Messages>
          ))}
        </div>

        <div className="fixed inset-x-0 bottom-0 bg-white py-2">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative mx-auto flex w-full  max-w-md items-center"
          >
            <input
              {...register("message", { required: true })}
              placeholder="chat"
              className="w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-800"
              type="text"
            />

            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                {loading && "Loading"} &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
