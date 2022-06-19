import Layout from "@components/layout";
import ProductItem from "@components/Share/ProductItem";
import UploadButton from "@components/Share/UploadButton";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import road from "public/localImage/road.jpg";

interface ProductsItems {
  ok: boolean;
  products: Product[];
  error?: string;
}

const Home: NextPage = () => {
  const { data, error } = useSWR<ProductsItems>(`/api/products`);

  return (
    <Layout title="Home" home={false}>
      {data?.products?.map((item) => (
        <React.Fragment key={item.id}>
          <ProductItem {...item} />
        </React.Fragment>
      ))}

      <div className="relative h-40 w-40">
        <Image
          src={road}
          layout="fill"
          objectFit="cover"
          alt="test"
          quality={2}
        />
      </div>
      <UploadButton pageText="product" />
    </Layout>
  );
};

export default Home;
