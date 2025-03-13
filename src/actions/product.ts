"use server";

import { addProduct } from "@/prisma-db";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  description?: string;
  price?: string;
};

export type FormState = {
  errors: Errors;
};

export async function addProductAction(
  prevSate: FormState,
  formdata: FormData
) {
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const price = formdata.get("price") as string;

  const errors: Errors = {};
  if (!title) {
    errors.title = "Title is required";
  }
  if (!description) {
    errors.description = "Description is required";
  }
  if (!price) {
    errors.price = "Price is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addProduct(title, parseInt(price), description);
  redirect("/products-db");
}
