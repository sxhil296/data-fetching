'use client'
import { addProductAction, FormState } from "@/actions/product";
// import SubmitBtn from "@/components/SubmitBtn";

import React, { useActionState } from "react";



const AddProductServerAction = () => {

  const initialState: FormState = {
    errors: {}
  }

  const [state, formAction, isPending]=useActionState(addProductAction, initialState);
 

  return (
    <form
      action={formAction}
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

export default AddProductServerAction;
