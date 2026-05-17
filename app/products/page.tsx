import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Products() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">All Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}