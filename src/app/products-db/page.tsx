import { getProducts } from "@/prisma-db";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDB() {
  const products: Product[] = await getProducts();
  console.log(products);
  return (
    <div className="p-10">
      <h1>Products</h1>
      <ul className="flex flex-col gap-4 w-full">
        {products.map((product) => (
          <li key={product.id} className="bg-gray-800 text-white border rounded max-w-full p-4">
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
