import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import ShareInput from "@components/Share/ShareInput";
import ShareTextArea from "@components/Share/ShareTextArea";
import useMutation from "@libs/client/mutation";
import { Stream } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  name: string;
  price: string;
  description: string;
  error?: string;
}

interface CreateMutation {
  ok: boolean;
  stream: Stream;
  error?: string;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateForm>();
  const [createStream, { data, loading }] =
    useMutation<CreateMutation>(`/api/streams`);
  const onValid = (data: CreateForm) => {
    if (loading) return;
    createStream(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="Upload" back={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="space-y-5 text-gray-700"
      >
        <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-gray-800 text-gray-400 transition-all hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <input className="hidden" type="file" accept="image/*" />
        </label>

        <div className="flex flex-col">
          <label className="mb-2" htmlFor="name">
            Name
          </label>
          <ShareInput
            register={register("name", { required: true })}
            placeholder="name"
            kind="text"
            id="name"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2" htmlFor="price">
            Price
          </label>
          <ShareInput
            register={register("price", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder="price"
            id="price"
            type="number"
            kind="number"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2" htmlFor="description">
            Description
          </label>
          <ShareTextArea
            register={register("description", {
              minLength: {
                value: 2,
                message: "2글자 이상 입력해주세요.",
              },
            })}
            id="description"
          />
        </div>
        <ShareButton text="Submit" loading={loading} />
      </form>
    </Layout>
  );
};

export default Create;
