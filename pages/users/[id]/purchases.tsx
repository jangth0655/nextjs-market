import Layout from "@components/layout";
import ProductItem from "@components/Share/ProductItem";
import { Product, Record } from "@prisma/client";
import React from "react";
import useSWR from "swr";

interface PurchaseWithProduct extends Record {
  product: Product;
}

interface PurchaseResponse {
  ok: boolean;
  purchases: PurchaseWithProduct[];
}

const Purchases: React.FC = () => {
  const { data } = useSWR<PurchaseResponse>(
    `/api/users/me/records?kind=purchase`
  );

  return (
    <Layout back={true} title="Purchase">
      {data?.purchases.map((purchase) => (
        <ProductItem key={purchase.id} {...purchase.product} />
      ))}
    </Layout>
  );
};
export default Purchases;
