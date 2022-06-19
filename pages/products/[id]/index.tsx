import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import { cls } from "@libs/client/cls";
import deliveryFile from "@libs/client/deliveryFile";
import useMutation from "@libs/client/mutation";
import { Product, User } from "@prisma/client";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UserWithProduct extends Product {
  user: User;
}

interface ItemDetailProps {
  ok: boolean;
  product: UserWithProduct;
  relatedProducts: Product;
  isLiked: boolean;
}

const ItemDetail = () => {
  const router = useRouter();

  const { data, error, mutate } = useSWR<ItemDetailProps>(
    router.query.id && `/api/products/${router.query.id}`
  );

  const [fav, { loading, data: favData }] = useMutation(
    router.query.id ? `/api/products/${router.query.id}/favs` : ""
  );

  const onFav = () => {
    fav({});
    mutate((data) => data && { ...data, isLiked: !data.isLiked }, false);
  };

  return (
    <Layout back={true} showing={false}>
      <div className="relative mb-4 h-96 w-full rounded-md bg-slate-700">
        {data?.product.image ? (
          <Image
            src={deliveryFile(data?.product.image)}
            layout="fill"
            objectFit="cover"
            alt="product"
          />
        ) : (
          <div className="relative mb-4 h-96 w-full rounded-md bg-slate-500"></div>
        )}
      </div>

      <div className="flex items-center text-gray-600">
        <div className=" mr-2 h-6 w-6 rounded-full bg-slate-700"></div>
        <div className="text-xm flex flex-col">
          <span>{data?.product?.user?.username}</span>
          <Link href={`/users/${data?.product?.userId}/profile`}>
            <a className="cursor-pointer text-gray-500 transition-all hover:text-blue-500">
              View profile &rarr;
            </a>
          </Link>
        </div>
      </div>

      <div className="my-7 h-[0.5px] w-full bg-gray-200"></div>

      <div className="space-y-6">
        <span className="text-xl font-bold">{data?.product?.name}</span>
        <div>
          <span>$</span>
          <span>price</span>
        </div>
        <p className="text-sm">{data?.product?.description}</p>

        <div className="flex">
          <ShareButton text="Talk to seller" />
          <button
            onClick={() => onFav()}
            className={cls(
              "flex w-[10%] items-center justify-center hover:scale-110",
              data?.isLiked ? "text-red-500" : "text-gray-300"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
