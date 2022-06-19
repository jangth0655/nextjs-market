import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import ShareInput from "@components/Share/ShareInput";
import ShareTextArea from "@components/Share/ShareTextArea";
import { cls } from "@libs/client/cls";
import useMutation from "@libs/client/mutation";
import useUser from "@libs/client/useUser";

import { Product } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UploadForm {
  name: string;
  image: FileList;
  price: number;
  description: string;
}

interface UploadingMutation {
  ok: boolean;
  product: Product;
  error?: string;
}

const Upload = () => {
  const [prev, setPrev] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadForm>();
  const [upload, { loading, data }] =
    useMutation<UploadingMutation>(`/api/products`);
  const onValid = async (data: UploadForm) => {
    if (loading) return;
    if (data.image && data.image.length > 0) {
      const { uploadURL } = await (await axios("/api/file")).data;

      const form = new FormData();
      form.append("file", data.image[0], `${user?.username}_${data.name}`);

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      upload({ ...data, productId: id });
    } else {
      upload(data);
    }
  };

  const image = watch("image");

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPrev(URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="Upload" back={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="space-y-5 text-gray-700"
      >
        {prev ? (
          <label className="relative flex h-48 w-full ">
            <Image
              priority
              src={prev}
              layout="fill"
              objectFit="cover"
              alt="product"
            />
            <input
              {...register("image")}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </label>
        ) : (
          <label
            htmlFor="product"
            className={cls(
              " flex h-48 w-full cursor-pointer  items-center justify-center rounded-md  border-gray-800 text-gray-400 transition-all hover:text-gray-800",
              "border-2 border-dotted"
            )}
          >
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
            <input
              id="product"
              {...register("image")}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </label>
        )}

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
            register={register("price", { required: true })}
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

export default Upload;
