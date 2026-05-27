'use client'

import Link from 'next/link'
import { Product } from '@/types'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const imageUrl = product?.image?.startsWith('http')
    ? product?.image
    : product?.image
  const slug = product?.urlSlug || product?._id

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={product?.title || 'Product image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
          {product.brandTitle} • {product.subCategory}
        </div>

        <h3 className="text-lg font-bold text-primary-dark mb-3 line-clamp-2 h-14">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-accent">
            ₹{product.saleAmount}
          </span>
          <span className="text-gray-400 line-through">₹{product.amount}</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs text-gray-500">Stock ID: {product.stockId}</span>

          <button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent-dark transition"
          >
            Add To Cart
          </button>

          <Link
            href={`/products/${slug}`}
            className="text-accent hover:text-accent-dark font-semibold text-sm flex items-center gap-1"
          >
            View Product
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}