import Error from "@components/Error";
import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import ShareTextArea from "@components/Share/ShareTextArea";
import useMutation from "@libs/client/mutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
}

interface WriteMutation {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteForm>();
  const [post, { data, loading }] = useMutation<WriteMutation>(`/api/posts`);
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
  };

  console.log(data);

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data?.post?.id}`);
    }
  }, [data, router]);

  return (
    <Layout back={true} title="Write">
      <form onSubmit={handleSubmit(onValid)}>
        <label
          className="mb-4 flex cursor-pointer font-bold text-gray-700"
          htmlFor="comment"
        >
          Comment
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <ShareTextArea
          register={register("question", {
            required: true,
            minLength: {
              value: 2,
              message: "2 글자 이상으로 작성하셔야 합니다.",
            },
          })}
          id="comment"
        />
        <div className="mt-4">
          <ShareButton text="Submit" loading={loading} />
        </div>
        {errors.question?.message && <Error error={errors.question?.message} />}
      </form>
    </Layout>
  );
};

export default Write;
