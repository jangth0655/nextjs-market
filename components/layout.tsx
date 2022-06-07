import { cls } from "@libs/client/cls";
import { NextRouter, useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useState } from "react";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const navItem = ["Home", "우리동네", "채팅", "Live", "Profile"];
const onNavigate = (navItem: string, router: NextRouter) => {
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
      router.push("/profile");
      break;
  }
};

const Layout = ({ children, title }: LayoutProps) => {
  const currentWindowSize = window.innerWidth;
  const [windowSize, setWindowSize] = useState(currentWindowSize);
  const router = useRouter();
  const [active, setActive] = useState(false);

  const handleWindowResize = useCallback((event: any) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  console.log(windowSize);

  return (
    <section>
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
                  onClick={() => onNavigate(item, router)}
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
          <div className="">
            <div className="h-6 w-5 bg-white"></div>
          </div>
        </div>
        {windowSize < 768 && (
          <div
            className={cls(
              "absolute -z-50 flex h-52  w-full scale-y-0 flex-col justify-evenly bg-slate-800",
              active
                ? "origin-top-center scale-y-100 "
                : "origin-top scale-y-0 "
            )}
          >
            {navItem.map((item, index) => (
              <div className="flex justify-center text-white" key={index}>
                <span
                  onClick={() => onNavigate(item, router)}
                  className="cursor-pointer text-gray-400  transition-all hover:text-white"
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </nav>

      <main>{children}</main>
    </section>
  );
};

export default Layout;
