import { addProduct } from "@/prisma-db";
import { redirect } from "next/navigation";
import React from "react";

const AddProductServerAction = () => {
  async function addProductAction(formdata: FormData) {
    "use server";
    const title = formdata.get("title") as string;
    const description = formdata.get("description") as string;
    const price = formdata.get("price") as string;
    await addProduct(title, parseInt(price), description);
    redirect("/products-db");
  }

  return (
    <form
      action={addProductAction}
      className="flex flex-col gap-4 max-w-2xl mx-auto p-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="border px-4 py-2 rounded outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          className="border px-4 py-2 rounded outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          className="border px-4 py-2 rounded outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded cursor-pointer text-white"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductServerAction;
