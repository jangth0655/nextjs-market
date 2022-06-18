import Layout from "@components/layout";
import { Stream, User } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

interface StreamWithUser extends Stream {
  user: User;
}

interface StreamResponse {
  ok: boolean;
  streams: StreamWithUser[];
}

const Streams: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(`/api/streams`);
  const onProfile = (id?: number) => {
    router.push(`/users/${id}/profile`);
  };

  return (
    <Layout back={true} title="Streams">
      {data?.streams.map((stream) => (
        <React.Fragment key={stream.id}>
          <div className="mb-6 flex h-80 text-gray-700 shadow-md">
            <div className=" w-[50%] ">
              <div className="h-full w-full bg-slate-600"></div>
            </div>

            <div className="flex w-[50%]  cursor-pointer flex-col  justify-between p-2 py-4 text-sm">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <Link href={`streams/${stream.id}`}>
                    <a className="flex flex-col justify-center">
                      <span className="font-bold">Name</span>
                      <span className="text-xs text-gray-500 transition-all hover:text-gray-800">
                        {stream.name}
                      </span>
                    </a>
                  </Link>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">Price</span>
                  <span className="text-xs text-gray-500">{stream.price}</span>
                </div>

                <div
                  onClick={() => onProfile(stream.user?.id)}
                  className="flex cursor-pointer items-center "
                >
                  <div className="mr-1 h-5 w-5 rounded-full bg-slate-500 "></div>
                  <span className="font-bold text-gray-500 transition-all hover:text-gray-800">
                    {stream.user?.username}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Description</span>
                  <span className=" text-gray-500">{stream.description}</span>
                </div>
              </div>

              <div className="flex items-center text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Likes</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </Layout>
  );
};

export default Streams;
