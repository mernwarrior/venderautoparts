import { getProducts } from '@/services/productService';
import { products as mockProducts } from '@/data/products';
import ProductsClient from '@/components/productClinet';

export default async function Products() {
  let fetchedProducts = [];
  try {
    fetchedProducts = await getProducts();
  } catch (error) {
    console.error('Failed to fetch products from API, using fallback:', error);
    fetchedProducts = mockProducts;
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">All Products</h1>
        <ProductsClient products={fetchedProducts} />
      </div>
    </div>
  );
}