import Layout from "@components/layout";
import { cls } from "@libs/client/cls";
import useUser from "@libs/client/useUser";
import { Review, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

interface ReviewsWithUser extends Review {
  user: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewsWithUser[];
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const { data } = useSWR<ReviewsResponse>("/api/reviews");

  return (
    <Layout back={true} title={`${user?.username}' Profile`}>
      <div className="mt-12 space-y-16">
        <div>
          <div className="flex items-center">
            <div className="mr-2 h-14 w-14 rounded-full bg-slate-500"></div>
            <div className="flex flex-col">
              <span>{user?.username}</span>
              <span>Edit Profile &rarr;</span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-around text-gray-700">
          <Link href={`/users/${user?.id}/sales`}>
            <a className="flex cursor-pointer flex-col items-center">
              <div className="hover mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-400 transition-all hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-600">Sale</span>
            </a>
          </Link>
          <Link href={`/users/${user?.id}/purchases`}>
            <a className="flex cursor-pointer flex-col items-center">
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-400 transition-all  hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-600">Purchase</span>
            </a>
          </Link>
          <Link href={`/users/${user?.id}/favs`}>
            <a className="flex cursor-pointer flex-col items-center">
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-400 transition-all  hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-600">Love</span>
            </a>
          </Link>
        </div>

        <div>
          {data?.reviews.map((review) => (
            <React.Fragment key={review.id}>
              <div className="mb-10 flex items-center">
                <div className="mr-2 h-10 w-10 rounded-full bg-slate-500">
                  <div></div>
                </div>
                <div>
                  <span>{user?.username}</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={cls(
                          "h-5 w-5",
                          review.score >= star
                            ? "text-yellow-500"
                            : "text-gray-500"
                        )}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p>{review.review}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
