'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { useCart } from './context/CartContext'
import { useToast } from '@/components/context/ToastContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState('')
  
  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    mobile: '',
    city: '',
    pincode: '',
  })

  const shippingCharge = cartTotal > 0 ? 99 : 0
  const grandTotal = cartTotal + shippingCharge

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBuyNow = async () => {
    // Validate inputs
    if (
      !shippingDetails.firstName.trim() ||
      !shippingDetails.lastName.trim() ||
      !shippingDetails.address.trim() ||
      !shippingDetails.mobile.trim() ||
      !shippingDetails.city.trim() ||
      !shippingDetails.pincode.trim()
    ) {
      setOrderError('Please fill in all the shipping details before placing the order.')
      return
    }

    setLoading(true)
    setOrderError('')

    try {
      const orderPayload = {
        firstName: shippingDetails.firstName.trim(),
        lastName: shippingDetails.lastName.trim(),
        address: shippingDetails.address.trim(),
        mobile: shippingDetails.mobile.trim(),
        city: shippingDetails.city.trim(),
        pincode: shippingDetails.pincode.trim(),
        items: cart.map((item) => ({
          productId: item._id,
          title: item.title,
          quantity: item.quantity,
          price: item.saleAmount,
          stockId: item.stockId,
        })),
        totalAmount: cartTotal,
        shippingCharge,
        grandTotal,
        orderDate: new Date().toISOString(),
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Order failed')
      }

      setOrderSuccess(true)
      clearCart()
      showToast('Order placed successfully! We will contact you soon.', 'success')
    } catch (error: any) {
      setOrderError(error.message || 'Something went wrong. Please try again.')
      showToast(error.message || 'Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // ─── SUCCESS STATE ──────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-primary-dark mb-3">Order Placed!</h2>
          <p className="text-gray-500 mb-6">
            Thank you for your order. We'll contact you shortly to confirm delivery details.
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // ─── EMPTY CART ─────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FaShoppingCart className="text-7xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Add some products to get started</p>
          <Link href="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  // ─── CART WITH ITEMS ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">

        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/products" className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-accent transition text-sm sm:text-base whitespace-nowrap">
            <FaArrowLeft />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <h1 className="text-xl sm:text-3xl font-bold text-primary-dark ml-auto">
            Your Cart
            <span className="ml-2 sm:ml-3 text-sm sm:text-lg font-normal text-gray-400">
              ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Cart Items & Shipping Details Form ── */}
          <div className="flex-1 space-y-6">
            
            {/* Cart Items List */}
            <div className="space-y-4">
              {cart.map((item) => {
                // const imageUrl = item.image.startsWith('http')
                //   ? item.image
                //   : `http://localhost:7005${item.image}`

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm p-3 sm:p-4 flex gap-3 sm:gap-4 items-center"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {/* <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      /> */}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                        {item.brandTitle} • {item.subCategory}
                      </p>
                      <h3 className="font-bold text-primary-dark text-xs sm:text-sm md:text-base line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Stock: {item.stockId}</p>

                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition text-xs sm:text-sm"
                          >
                            <FaMinus className="text-[10px] sm:text-xs" />
                          </button>
                          <span className="px-2 sm:px-3 font-semibold text-xs sm:text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 transition text-xs sm:text-sm"
                          >
                            <FaPlus className="text-[10px] sm:text-xs" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => { removeFromCart(item._id); showToast('Item removed from cart', 'info') }}
                          className="text-red-400 hover:text-red-600 transition ml-0 sm:ml-2"
                          title="Remove item"
                        >
                          <FaTrash className="text-xs sm:text-sm" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm sm:text-lg font-bold text-accent">
                        ₹{(item.saleAmount * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400 line-through">
                        ₹{(item.amount * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-400">₹{item.saleAmount} each</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Shipping details form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary-dark mb-6 pb-3 border-b">
                Shipping & Delivery Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={shippingDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={shippingDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    placeholder="Flat / House No, Street, Area, Landmark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Mobile No *</label>
                  <input
                    type="tel"
                    required
                    name="mobile"
                    value={shippingDetails.mobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    placeholder="Enter city"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={shippingDetails.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* ── Order Summary ── */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary-dark mb-6 pb-3 border-b">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shippingCharge}</span>
                </div>
                <div className="flex justify-between font-bold text-primary-dark text-base pt-3 border-t">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Savings badge */}
              {cart.reduce((s, i) => s + (i.amount - i.saleAmount) * i.quantity, 0) > 0 && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-700 text-sm text-center font-semibold">
                  🎉 You save ₹
                  {cart
                    .reduce((s, i) => s + (i.amount - i.saleAmount) * i.quantity, 0)
                    .toLocaleString()}
                </div>
              )}

              {/* Error */}
              {orderError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-600 text-sm">
                  {orderError}
                </div>
              )}

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={loading}
                className="w-full mt-6 bg-accent text-white py-3 rounded-lg font-bold text-base hover:bg-accent-dark transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  'Buy Now'
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Secure order • We'll confirm via call
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}