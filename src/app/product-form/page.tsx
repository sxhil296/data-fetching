"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, price }),
      });
      if (response.ok) {
        router.push("/products-db");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-2xl mx-auto p-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="descriprion">Description</label>
        <input
          type="text"
          id="descriprion"
          name="descriprion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-4 py-2 rounded outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 rounded outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded cursor-pointer text-white"
        disabled={loading}
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </form>
  );
}
