'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-dark text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+919266323328" className="flex items-center gap-2 hover:text-accent">
              <FaPhone className="text-xs" />
              <span>Call Us: +91 - 9266323328</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-xs" />
            <a href="mailto:venderautoparts@hotmail.com" className="hover:text-accent">
              venderautoparts@hotmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="bg-accent text-white px-4 py-2 font-bold text-2xl" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'}}>
                VENDER
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-accent font-semibold transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-accent font-semibold transition-colors">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-accent font-semibold transition-colors">
                Services
              </Link>
              
              {/* Products Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-accent font-semibold transition-colors flex items-center gap-1">
                  Products
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link href="/products" className="block px-4 py-2 hover:bg-gray-100">All Products</Link>
                  <Link href="/products/tvs" className="block px-4 py-2 hover:bg-gray-100">TVS Parts</Link>
                  <Link href="/products/bajaj" className="block px-4 py-2 hover:bg-gray-100">Bajaj Auto Parts</Link>
                </div>
              </div>

              <Link href="/contact" className="text-gray-700 hover:text-accent font-semibold transition-colors">
                Contact
              </Link>
              <Link href="/contact" className="btn-primary">
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-2xl text-primary">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container-custom py-4 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-accent font-semibold" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-accent font-semibold" onClick={toggleMenu}>
                About
              </Link>
              <Link href="/services" className="block text-gray-700 hover:text-accent font-semibold" onClick={toggleMenu}>
                Services
              </Link>
              
              <div>
                <button 
                  onClick={() => setProductsOpen(!productsOpen)} 
                  className="w-full text-left text-gray-700 hover:text-accent font-semibold flex justify-between items-center"
                >
                  Products
                  <svg className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/products" className="block text-gray-600 hover:text-accent" onClick={toggleMenu}>
                      All Products
                    </Link>
                    <Link href="/products/tvs" className="block text-gray-600 hover:text-accent" onClick={toggleMenu}>
                      TVS Parts
                    </Link>
                    <Link href="/products/bajaj" className="block text-gray-600 hover:text-accent" onClick={toggleMenu}>
                      Bajaj Auto Parts
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="block text-gray-700 hover:text-accent font-semibold" onClick={toggleMenu}>
                Contact
              </Link>
              <Link href="/contact" className="block btn-primary text-center" onClick={toggleMenu}>
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}