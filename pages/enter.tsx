import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/auth/Input";
import { cls } from "@libs/client/cls";
import useMutation from "@libs/client/mutation";
import enterImage from "../public/auth/enter.jpg";
import { useRouter } from "next/router";
import { Token } from "@prisma/client";
import Button from "@components/auth/Button";
import TokenConfirm from "@components/auth/TokenConfirm";
import Error from "@components/Error";

type RegisterMethod = "login" | "signup";

interface EnterForm {
  email?: string;
  username: string;
  error?: string;
}

interface EnterMutation {
  ok: boolean;
  error?: string;
  token: string;
}

interface LoginMutation {
  ok: boolean;
  error?: string;
  token: Token;
}

const Enter: NextPage = () => {
  const router = useRouter();
  const [okToken, setOkToken] = useState(false);
  const [method, setMethod] = useState<RegisterMethod>("login");
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<EnterForm>({
    mode: "onChange",
  });

  const [enter, { data: enterData, loading: enterLoading, error: enterError }] =
    useMutation<EnterMutation>("/api/users/enter");
  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation<LoginMutation>("/api/users/login");

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
    if (enterError) {
      setError("error", { message: enterError });
    }
    if (loginError) {
      setError("error", { message: loginError });
    }
  }, [enterError, loginError]);

  useEffect(() => {
    if (enterData && enterData.ok) {
      setOkToken(true);
    }
    if (loginData && loginData.ok) {
      router.push("/");
    }
  }, [router, loginData, enterData]);

  const submitLoading = enterLoading || loginLoading;

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
      <main className="relative  h-[320px] w-full max-w-lg ">
        {enterData && enterData.token && okToken && (
          <TokenConfirm toggleToken={setOkToken} payload={enterData?.token} />
        )}
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

          {method === "signup" && (
            <>
              <div className="w-[80%] overflow-hidden rounded-md ">
                <Input
                  placeholder="Email"
                  htmlFor="email"
                  id="email"
                  icon="email"
                  register={register("email", {
                    required: "Email is required.",
                  })}
                  hasError={Boolean(errors.email)}
                />
                <Input
                  placeholder="Username"
                  icon="username"
                  htmlFor="username"
                  id="username"
                  register={register("username", {
                    required: "username is required.",
                  })}
                  hasError={Boolean(errors.username)}
                />
              </div>
              <Button
                loading={submitLoading}
                SubmitName="Register"
                disabled={!isValid}
              />
            </>
          )}

          {method === "login" && (
            <>
              <div className="w-[80%] overflow-hidden rounded-md ">
                <Input
                  placeholder="Username"
                  icon="username"
                  htmlFor="username"
                  id="username"
                  register={register("username", {
                    required: "username is required.",
                  })}
                />
              </div>
              <Button
                loading={submitLoading}
                SubmitName="Login"
                disabled={!isValid}
              />
            </>
          )}
          <div className="">
            {errors.email?.message && <Error error={errors.email?.message} />}
            {errors.username?.message && (
              <Error error={errors.username.message} />
            )}
            {errors.error?.message && <Error error={errors.error?.message} />}
          </div>
        </form>
      </main>
    </section>
  );
};

export default Enter;
