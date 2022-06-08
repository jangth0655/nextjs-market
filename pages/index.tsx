import Layout from "@components/layout";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ProductsItems {
  ok: boolean;
  products: Product[];
  error?: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR<ProductsItems>(`/api/products`);

  const onUpload = () => {
    router.push("/products/upload");
  };
  return (
    <Layout title="Home">
      <div className="">hello</div>

      <div
        onClick={() => onUpload()}
        className="fixed bottom-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-600  transition-all hover:bg-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </Layout>
  );
};

export default Home;
