
import ProductDetails from "@/components/productDetail";
import { getProducts } from "@/prisma-db";



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
   <ProductDetails products={products} />
  );
}
