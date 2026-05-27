'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white overflow-hidden">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Background Images */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-3 h-full">
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/hero-1.jpg)' }}
          />

          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/hero-2.jpg)' }}
          />

          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/hero-3.jpg)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">

        <div className="max-w-3xl">

          <p className="uppercase tracking-[5px] text-accent mb-4 font-semibold">
            Trusted Auto Parts Manufacturer
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            High Quality
            <br />

            <span className="text-accent">
              Spare Parts
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Premium quality Bajaj, TVS and motorcycle spare parts
            with precision engineering and long-lasting durability.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">

            <Link
              href="/products"
              className="btn-primary inline-block text-sm sm:text-base"
            >
              Explore Range
            </Link>

            <Link
              href="/contact"
              className="border border-white px-5 sm:px-6 py-3 rounded-md hover:bg-white hover:text-black transition text-sm sm:text-base"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}