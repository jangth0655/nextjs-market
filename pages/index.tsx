import Layout from "@components/layout";
import ProductItem from "@components/Share/ProductItem";
import UploadButton from "@components/Share/UploadButton";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

interface ProductsItems {
  ok: boolean;
  products: Product[];
  error?: string;
}

const Home: NextPage = () => {
  const { data, error } = useSWR<ProductsItems>(`/api/products`);

  return (
    <Layout title="Home" home={false}>
      {data?.products.map((item) => (
        <React.Fragment key={item.id}>
          <ProductItem {...item} />
        </React.Fragment>
      ))}

      <UploadButton pageText="product" />
    </Layout>
  );
};

export default Home;
