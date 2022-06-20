import Layout from "@components/layout";
import ProductItem from "@components/Share/ProductItem";
import UploadButton from "@components/Share/UploadButton";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import React from "react";
import useSWR, { SWRConfig } from "swr";
import client from "libs/server/client";
import Link from "next/link";

interface ProductsItems {
  ok: boolean;
  products: Product[];
  error?: string;
}

const Home: NextPage = () => {
  const { data, error } = useSWR<ProductsItems>(`/api/products`);

  return (
    <Layout title="Home" home={false} seoTitle="Home">
      {data?.products?.map((item) => (
        <React.Fragment key={item.id}>
          <ProductItem {...item} />
        </React.Fragment>
      ))}

      <div>
        <Link href={"/streams"}>
          <a>Stream</a>
        </Link>
      </div>

      <UploadButton pageText="product" />
    </Layout>
  );
};

const Page: NextPage<{ products: Product[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export const getServerSideProps = async () => {
  const products = await client.product.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default Page;
