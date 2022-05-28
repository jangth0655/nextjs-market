import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/auth/Input";
import { cls } from "@libs/client/cls";
import useMutation from "@libs/client/mutation";
import enterImage from "../public/auth/enter.jpg";

type RegisterMethod = "login" | "signup";

interface EnterForm {
  email?: string;
  username: string;
}

interface EnterMutation {
  ok: boolean;
  error?: string;
}

const Enter: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<EnterForm>({
    mode: "onChange",
  });

  const [enter, { data: enterData, loading: enterLoading, error: enterError }] =
    useMutation<EnterMutation>("/api/users/enter");
  const [login, { loading: loginLoading, error: loginError }] =
    useMutation("/api/users/login");

  const onValid = (data: EnterForm) => {
    if (enterLoading || loginLoading) return;
    if (data.email && data.username) {
      enter(data);
      reset();
      return;
    }
    if (data.username) {
      login(data.username);
      reset();
      return;
    }
  };

  useEffect(() => {
    if (enterData && enterData?.ok) {
      setMethod("login");
    }
  }, [enterData]);

  const [method, setMethod] = useState<RegisterMethod>("signup");
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute -z-40 h-full w-full bg-black opacity-40"></div>
      <Image
        src={enterImage}
        alt="titleImage"
        layout="fill"
        objectFit="cover"
        className="-z-50"
      />
      <main className="relative  h-[320px] w-full max-w-lg">
        <div className="absolute -z-10 h-full w-full rounded-md  bg-black  opacity-50"></div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="z-10 flex h-full max-w-lg flex-col   items-center justify-center  space-y-1 text-white"
        >
          <div className="mb-6 flex items-center justify-center space-x-6 uppercase">
            <span
              className={cls(
                method === "signup" ? "border-b-2 border-blue-500" : "",
                "cursor-pointer py-1"
              )}
              onClick={() => {
                setMethod("signup"), reset();
              }}
            >
              register
            </span>
            <div className="h-full w-[0.5px] bg-white"></div>
            <span
              className={cls(
                method === "login" ? "border-b-2 border-blue-500" : "",
                "cursor-pointer py-1"
              )}
              onClick={() => {
                setMethod("login"), reset();
              }}
            >
              log in
            </span>
          </div>

          <div className="w-[80%] overflow-hidden rounded-md bg-white">
            {method === "signup" && (
              <>
                <Input
                  placeholder="Email"
                  htmlFor="email"
                  id="email"
                  icon="email"
                  register={register("email", { required: true })}
                />
                <Input
                  placeholder="Username"
                  icon="username"
                  htmlFor="username"
                  id="username"
                  register={register("username", { required: true })}
                />
              </>
            )}
            {method === "login" && (
              <Input
                placeholder="Username"
                icon="username"
                htmlFor="username"
                id="username"
                register={register("username", { required: true })}
              />
            )}
          </div>

          <button className="w-[80%] rounded-md  bg-blue-600 p-2 uppercase">
            {enterLoading || loginLoading ? "loading" : "Start"}
          </button>
          {enterError}
          {/* error message */}
          <div></div>
        </form>
      </main>
    </section>
  );
};

export default Enter;
