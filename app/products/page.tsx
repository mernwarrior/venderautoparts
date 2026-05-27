import { getProducts } from '@/lib/data';
import ProductsClient from '@/components/productClinet';

export const dynamic = 'force-dynamic'

export default async function Products() {
  const fetchedProducts = await getProducts();

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">All Products</h1>
        <ProductsClient products={fetchedProducts} />
      </div>
    </div>
  );
}