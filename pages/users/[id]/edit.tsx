import Error from "@components/Error";
import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import ShareInput from "@components/Share/ShareInput";
import useMutation from "@libs/client/mutation";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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

  const onValid = ({ email, username, avatar }: EditForm) => {
    return;
    if (loading) return;
    if (email === "" && username === "") {
      setError("error", { message: "email or username is required." });
    }
    edit({ email, username });
  };

  const image = watch("avatar");
  console.log(image[0]);

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
    }
  }, [user, setValue]);
  return (
    <Layout back={true} title="Edit Profile">
      <div className="mt-10">
        <div className="flex items-center">
          <label
            htmlFor="avatar"
            className="mr-2 h-20 w-20 cursor-pointer rounded-full bg-slate-500"
          >
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
