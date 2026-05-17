'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-primary-dark mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-accent mt-1">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Phone</h3>
                    <a href="tel:+919266323328" className="text-gray-600 hover:text-accent">
                      +91 - 9266323328
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl text-accent mt-1">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Email</h3>
                    <a href="mailto:venderautoparts@hotmail.com" className="text-gray-600 hover:text-accent break-all">
                      venderautoparts@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl text-accent mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Address</h3>
                    <p className="text-gray-600">
                      Sidhauli Canal Expreeway, Infront of<br />
                      International School, Ludhiana (141421)<br />
                      Punjab, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need a Quote?</h3>
              <p className="mb-6">Get in touch with us for competitive pricing and bulk orders.</p>
              <a href="tel:+919266323328" className="bg-white text-accent px-8 py-3 rounded font-semibold inline-block hover:bg-gray-100 transition-colors">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}