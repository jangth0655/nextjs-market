import Layout from "@components/layout";
import ProductItem from "@components/Share/ProductItem";
import { Kind, Product, Record } from "@prisma/client";
import React from "react";
import useSWR from "swr";

interface SaleWithProduct extends Record {
  product: Product;
}

interface SalesResponse {
  ok: boolean;
  sales: SaleWithProduct[];
}

const Sales: React.FC = () => {
  const { data } = useSWR<SalesResponse>(`/api/users/me/records?kind=sale`);
  console.log(data);
  return (
    <Layout back={true} title="Sale">
      {data?.sales.map((sale) => (
        <ProductItem key={sale.id} {...sale?.product} />
      ))}
    </Layout>
  );
};
export default Sales;
