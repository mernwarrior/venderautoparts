'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCart } from '@/components/context/CartContext'
import { useToast } from '@/components/context/ToastContext'
import { Product } from '@/types'
import { FaShoppingCart, FaArrowLeft, FaCheckCircle, FaTruck, FaShieldAlt, FaBoxOpen } from 'react-icons/fa'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        setProduct(data.product || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      showToast(`${product.title} added to cart!`, 'success')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found</h2>
        <Link href="/products" className="btn-primary">Back to Products</Link>
      </div>
    )
  }

  const imageUrl = product.image?.startsWith('http') ? product.image : product.image

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition mb-6 text-sm">
          <FaArrowLeft />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative h-72 sm:h-96 lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden group">
            <Image
              src={imageUrl || '/placeholder.png'}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.amount > product.saleAmount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {Math.round(((product.amount - product.saleAmount) / product.amount) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wider">
              {product.brandTitle} • {product.subCategory}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Price Section */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Stock ID</div>
                  <div className="text-base sm:text-xl font-semibold text-primary-dark font-mono">{product.stockId}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Price</div>
                  <div className="flex items-center sm:justify-end gap-2">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">₹{product.saleAmount}</span>
                    {product.amount > product.saleAmount && (
                      <span className="text-sm sm:text-base text-gray-400 line-through">₹{product.amount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-primary-dark mb-3">Description</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm sm:text-base">
                <FaShoppingCart />
                Add to Cart
              </button>
              <Link href="/contact" className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm sm:text-base text-center">
                Get Quote
              </Link>
            </div>

            {/* Product Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 sm:p-4">
                <FaCheckCircle className="text-accent text-base sm:text-lg flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700">Genuine quality parts</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 sm:p-4">
                <FaShieldAlt className="text-accent text-base sm:text-lg flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700">Inspected before packing</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 sm:p-4">
                <FaTruck className="text-accent text-base sm:text-lg flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700">International shipping</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3 sm:p-4">
                <FaBoxOpen className="text-accent text-base sm:text-lg flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700">Secure packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
