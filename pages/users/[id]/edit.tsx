import Error from "@components/Error";
import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import ShareInput from "@components/Share/ShareInput";
import deliveryFile from "@libs/client/deliveryFile";
import useMutation from "@libs/client/mutation";
import useUser from "@libs/client/useUser";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditForm {
  username: string;
  email: string;
  error?: string;
  avatar: FileList;
}

interface EditMutation {
  ok: boolean;
  error?: string;
}

const Edit: React.FC = () => {
  const [prev, setPrev] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditForm>();
  const [edit, { data, loading }] = useMutation<EditMutation>(`/api/users/me`);

  const onValid = async ({ email, username, avatar }: EditForm) => {
    if (loading) return;
    if (email === "" && username === "") {
      setError("error", { message: "email or username is required." });
    }
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await axios("/api/file")).data;

      const form = new FormData();
      form.append("file", avatar[0], user?.username);

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      edit({ email, username, avatarId: id });
    } else {
      edit({ email, username });
    }
  };

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      const avatarUrl = URL.createObjectURL(file);
      setPrev(avatarUrl);
    }
  }, [avatar]);

  useEffect(() => {
    if (data && !data.ok) {
      setError("error", { message: data.error });
    }
    if (data && data.ok) {
      router.push("/");
    }
  }, [data, setError, router]);

  useEffect(() => {
    if (user) {
      user.username && setValue("username", user.username);
      user.email && setValue("email", user.email);
      user.avatar && setPrev(deliveryFile(user.avatar, "small"));
    }
  }, [user, setValue]);
  return (
    <Layout back={true} title="Edit Profile">
      <div className="mt-10">
        <div className="flex items-center">
          <label
            htmlFor="avatar"
            className="relative mr-2 h-20 w-20 cursor-pointer rounded-full bg-slate-500"
          >
            {prev ? (
              <Image
                layout="fill"
                objectFit="cover"
                src={prev}
                className="rounded-full"
                alt="avatar"
                priority
              />
            ) : null}

            <input
              {...register("avatar")}
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>

          <div className="flex flex-col">
            <span>{user?.username}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onValid)} className="space-y-5">
        <div className="mt-10">
          <label htmlFor="username" className="mb-2 flex">
            Username
          </label>
          <ShareInput
            register={register("username")}
            placeholder="username"
            kind="text"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="username" className="mb-2 flex">
            Email
          </label>
          <ShareInput
            register={register("email")}
            placeholder="email"
            kind="text"
            id="username"
          />
        </div>
        <div>
          <ShareButton text="Submit" loading={loading} />
        </div>
        {errors.error?.message && <Error error={errors.error.message} />}
      </form>
    </Layout>
  );
};

export default Edit;
