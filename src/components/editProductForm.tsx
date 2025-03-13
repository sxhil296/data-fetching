"use client";
import { editProductAction, FormState } from "@/actions/product";
import { Product } from "@/app/products-db/page";

import React, { useActionState } from "react";

const EditProductForm = ({ product }: { product: Product }) => {
  const initialState: FormState = {
    errors: {},
  };

  const editProductWithId = editProductAction.bind(null, product.id);

  const [state, formAction, isPending] = useActionState(
    editProductWithId,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 max-w-2xl mx-auto p-6"

    >
        {/* this would expose the id in html without proper encoding, use js bind method instead */}
        {/* <input type="hidden" name="id" id="id" value={product.id}/> */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="border px-4 py-2 rounded outline-none"
          defaultValue={product.title}
        />
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          className="border px-4 py-2 rounded outline-none"
          defaultValue={product.description ?? ""}
        />
        {state.errors.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          className="border px-4 py-2 rounded outline-none"
          defaultValue={product.price.toString()}
        />
        {state.errors.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>
      {/* <SubmitBtn /> */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded cursor-pointer text-white"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default EditProductForm;
