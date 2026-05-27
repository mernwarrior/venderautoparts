'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useToast } from '@/components/context/ToastContext';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      showToast('Message sent successfully! We will contact you soon.', 'success')
    } catch (err: unknown) {
      const message = 'Something went wrong. Please try again.';
      setError(message);
      showToast(message, 'error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Contact Form ─────────────────────────────────── */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-6">Get in Touch</h2>

            {/* Success state */}
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FaCheckCircle className="text-6xl text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-primary-dark mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">
                  Thank you for your inquiry. We will contact you soon.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
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
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Email */}
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
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Phone */}
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
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Message */}
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
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-md px-4 py-2 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Information ───────────────────────────── */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-accent mt-1"><FaPhone /></div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Phone</h3>
                    <a href="tel:+919266323328" className="text-gray-600 hover:text-accent">
                      +91 - 9266323328
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl text-accent mt-1"><FaEnvelope /></div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Email</h3>
                    <a
                      href="mailto:venderautoparts@hotmail.com"
                      className="text-gray-600 hover:text-accent break-all"
                    >
                      venderautoparts@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-2xl text-accent mt-1"><FaMapMarkerAlt /></div>
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

            <div className="bg-accent text-white rounded-lg p-6 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Need a Quote?</h3>
              <p className="mb-6">Get in touch with us for competitive pricing and bulk orders.</p>
              <a
                href="tel:+919266323328"
                className="bg-white text-accent px-8 py-3 rounded font-semibold inline-block hover:bg-gray-100 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}