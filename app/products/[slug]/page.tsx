import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductDetails({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.image.startsWith('http')
    ? product.image
    : product.image;

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
              {product.brandTitle} • {product.subCategory}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              {product.title}
            </h1>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">Stock ID</div>
                <div className="text-xl font-semibold text-primary">{product.stockId}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Price</div>
                <div className="text-2xl font-bold text-accent">₹{product.saleAmount}</div>
                {product.amount > product.saleAmount && (
                  <span className="text-xs text-gray-400 line-through">₹{product.amount}</span>
                )}
              </div>
            </div>

            <div className="prose prose-lg mb-8">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <Link href="/contact" className="btn-primary w-full md:w-auto block text-center">
                Get Quote / Contact Us
              </Link>
              <Link href="/products" className="btn-secondary w-full md:w-auto block text-center">
                Back to Products
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-primary-dark mb-3">Product Information</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Genuine quality parts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Inspected before packing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>International standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Secure packaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}