import { getProducts } from '@/lib/data';
import ProductsClient from '@/components/productClinet';

export const dynamic = 'force-dynamic'

export default async function BajajProducts() {
  const fetchedProducts = await getProducts();

  const bajajProducts = fetchedProducts.filter(
    (p: any) =>
      p.category?.toLowerCase().includes('bajaj') ||
      p.brandTitle?.toLowerCase().includes('bajaj')
  );

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">Bajaj Auto Parts</h1>
        <ProductsClient products={bajajProducts} />
      </div>
    </div>
  );
}