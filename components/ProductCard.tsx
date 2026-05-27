'use client'

import Link from 'next/link'
import { Product } from '@/types'
import Image from 'next/image'
import { useToast } from '@/components/context/ToastContext'

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const { showToast } = useToast()
  const imageUrl = product?.image?.startsWith('http')
    ? product?.image
    : product?.image

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    showToast(`${product.title} added to cart!`, 'success')
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={product?.title || 'Product image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 sm:p-6">
        <div className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase tracking-wider">
          {product.brandTitle} • {product.subCategory}
        </div>

        <h3 className="text-sm sm:text-lg font-bold text-primary-dark mb-2 sm:mb-3 line-clamp-2 h-10 sm:h-14">
          {product.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-base sm:text-xl font-bold text-accent">
            ₹{product.saleAmount}
          </span>
          <span className="text-xs sm:text-sm text-gray-400 line-through">₹{product.amount}</span>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs text-gray-500">Stock ID: {product.stockId}</span>

          <button
            onClick={handleAddToCart}
            className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent-dark transition text-xs sm:text-sm"
          >
            Add To Cart
          </button>

          <Link
            href={`/products/${product._id}`}
            className="text-accent hover:text-accent-dark font-semibold text-xs sm:text-sm flex items-center gap-1"
          >
            View Product
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
