import { getProducts } from '@/lib/data';
import ProductsClient from '@/components/productClinet';

export const dynamic = 'force-dynamic'

export default async function TVSProducts() {
  const fetchedProducts = await getProducts();

  const tvsProducts = fetchedProducts.filter(
    (p: any) =>
      p.category?.toLowerCase().includes('tvs') ||
      p.brandTitle?.toLowerCase().includes('tvs')
  );

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">TVS Parts</h1>
        <ProductsClient products={tvsProducts} />
      </div>
    </div>
  );
}