"use client";

import EditProductForm from "@/components/editProductForm";
import { getProduct } from "@/prisma-db";
import { notFound } from "next/navigation";
// import SubmitBtn from "@/components/SubmitBtn";

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProduct(parseInt(id));
  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
};

export default EditProduct;
