import { getProducts } from '@/services/productService';
import { products as mockProducts } from '@/data/products';
import ProductsClient from '@/components/productClinet';

export default async function TVSProducts() {
  let fetchedProducts = [];
  try {
    fetchedProducts = await getProducts();
  } catch (error) {
    console.error('Failed to fetch products from API, using fallback:', error);
    fetchedProducts = mockProducts;
  }

  const tvsProducts = fetchedProducts.filter(
    (p) =>
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