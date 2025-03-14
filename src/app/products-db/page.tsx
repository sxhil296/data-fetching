import { deleteProductAction } from "@/actions/product";
import { getProducts } from "@/prisma-db";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDB() {
  const products: Product[] = await getProducts();
  console.log(products);
  return (
    <div className="p-2 overflow-y-auto">
      <h1>Products</h1>
      <ul className="flex flex-col gap-4 w-full">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-gray-800 text-white border rounded max-w-full p-4"
          >
           <Link href={`/products-db/${product.id}`}> <h2>{product.title}</h2></Link>
            <p>{product.price}</p>
            <p>{product.description}</p>
           <form action={deleteProductAction.bind(null, product.id)}>
           <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              Delete
            </button>
           </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
