'use client'

import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-accent text-white px-4 py-2 font-bold text-2xl inline-block mb-4" style={{clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'}}>
              VENDER
            </div>
            <p className="text-sm mb-4 text-gray-300">
              Vender Auto Parts<br />
              High quality three wheeler spare parts
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white text-primary-dark p-2 rounded hover:bg-accent hover:text-white transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white text-primary-dark p-2 rounded hover:bg-accent hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-300 hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact details</h3>
            <div className="text-gray-300 space-y-2 text-sm">
              <p className="font-semibold text-white">Vender Auto Parts</p>
              <p>Sidhauli Canal Expreeway, Infront of<br />international school, Ludhiana (141421)<br />Punjab, India.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary py-4">
        <div className="container-custom text-center text-sm text-gray-300">
          Copyright © 2026 Vender Auto Parts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}