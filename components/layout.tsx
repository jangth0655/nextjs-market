import { cls } from "@libs/client/cls";
import useUser from "@libs/client/useUser";
import { NextRouter, useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  back?: boolean;
  home?: boolean;
  showing?: boolean;
}

const navItem = ["Home", "우리동네", "채팅", "Live", "Profile"];
const onNavigate = (navItem: string, router: NextRouter, id?: number) => {
  switch (navItem) {
    case "Home":
      router.push("/");
      break;
    case "우리동네":
      router.push("/community");
      break;
    case "채팅":
      router.push("/chats");
      break;
    case "Live":
      router.push("/streams");
      break;
    case "Profile":
      router.push(`/users/${id}/profile`);
      break;
    default:
      router.push("/");
  }
};

const Layout = ({
  children,
  title,
  back,
  showing = true,
  home = true,
}: LayoutProps) => {
  const [windowSize, setWindowSize] = useState(0);
  const router = useRouter();
  const { user } = useUser();
  const [active, setActive] = useState(false);

  const onProfile = (id?: number) => {
    router.push(`/users/${id}/profile`);
  };

  const onHome = () => {
    router.push("/");
  };

  const handleWindowResize = useCallback((event: any) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const onBack = () => {
    router.back();
  };

  return (
    <section>
      {showing ? (
        <nav className="fixed w-full">
          <div className="flex items-center justify-between p-4 px-2 dark:bg-gray-900 dark:text-white">
            <div className="w-[50%] space-x-10 font-bold">
              {windowSize < 768 ? (
                <svg
                  onClick={() => setActive((prev) => !prev)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6  w-6 hover:cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                navItem.map((item, index) => (
                  <span
                    className="cursor-pointer text-gray-500 transition-all hover:text-gray-100"
                    onClick={() => onNavigate(item, router, user?.id)}
                    key={index}
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
            <div className="text-center font-bold">
              <span>{title}</span>
            </div>
            <div onClick={() => onProfile(user?.id)} className="cursor-pointer">
              <div className="h-6 w-5 bg-white"></div>
            </div>
          </div>
          {windowSize < 768 && (
            <div
              className={cls(
                "absolute -z-50 flex h-52  w-full scale-y-0 flex-col justify-evenly bg-slate-800 ",
                active
                  ? "origin-top-center scale-y-100 "
                  : "origin-top scale-y-0 "
              )}
            >
              {navItem.map((item, index) => (
                <div className="flex justify-center text-white" key={index}>
                  <span
                    onClick={() => onNavigate(item, router, user?.id)}
                    className="cursor-pointer text-gray-400  transition-all hover:text-white"
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </nav>
      ) : null}

      <main
        className={cls(
          "m-auto min-h-screen max-w-2xl px-4 ",
          showing ? "py-20" : "py-4"
        )}
      >
        <div className="flex items-center">
          {home ? (
            <div
              onClick={() => onHome()}
              className="mb-4 mr-2 cursor-pointer rounded-md p-1 text-gray-500 transition-all hover:text-gray-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          ) : null}
          {back ? (
            <div
              onClick={() => onBack()}
              className="mb-4 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-700 transition-all hover:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
          ) : null}
        </div>

        {children}
      </main>
    </section>
  );
};

export default Layout;
