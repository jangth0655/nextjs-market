import Layout from "@components/layout";
import ShareButton from "@components/Share/ShareButton";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface UserWithProduct extends Product {
  user: User;
}

interface ItemDetailProps {
  ok: boolean;
  product: UserWithProduct;
  relatedProducts: Product;
}

const ItemDetail = () => {
  const router = useRouter();

  const { data, error } = useSWR<ItemDetailProps>(
    router.query.id && `/api/products/${router.query.id}`
  );

  return (
    <Layout back={true} showing={false}>
      <div className="mb-4 h-96 w-full rounded-md bg-slate-700">
        <div></div>
      </div>

      <div className="flex items-center text-gray-600">
        <div className=" mr-2 h-6 w-6 rounded-full bg-slate-700"></div>
        <div className="text-xm flex flex-col">
          <span>{data?.product.user.username}</span>
          <Link href={`/users/profiles/${data?.product.userId}`}>
            <a className="cursor-pointer text-gray-500 transition-all hover:text-blue-500">
              View profile &rarr;
            </a>
          </Link>
        </div>
      </div>

      <div className="my-7 h-[0.5px] w-full bg-gray-200"></div>

      <div className="space-y-6">
        <span className="text-xl font-bold">{data?.product.name}</span>
        <div>
          <span>$</span>
          <span>price</span>
        </div>
        <p className="text-sm">{data?.product.description}</p>
        <div className="flex">
          <ShareButton text="Talk to seller" />
          <div className="flex w-[10%] items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
