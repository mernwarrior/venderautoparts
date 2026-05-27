import { getProducts } from '@/services/productService';
import { products as mockProducts } from '@/data/products';
import ProductsClient from '@/components/productClinet';

export default async function BajajProducts() {
  let fetchedProducts = [];
  try {
    fetchedProducts = await getProducts();
  } catch (error) {
    console.error('Failed to fetch products from API, using fallback:', error);
    fetchedProducts = mockProducts;
  }

  const bajajProducts = fetchedProducts.filter(
    (p) =>
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