'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/components/DefaultLayout/DefaultLayout'; // Assuming this is where Navbar and Footer are

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for form submission logic (e.g., API request)
    setTimeout(() => {
      alert('Your message has been sent!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg border border-gray-200">
          <h1 className="mb-6 text-3xl font-semibold text-[#ff6e18]">Contact Us</h1>

          <p className="mb-6 text-lg text-gray-700">
            Have any questions? Reach out to us! Our customer support team is here to help with anything you need.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-800">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:ring-[#ff6e18] focus:outline-none"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:ring-[#ff6e18] focus:outline-none"
                placeholder="Your Email Address"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-gray-800">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md focus:ring-[#ff6e18] focus:outline-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#ff6e18]'
                } text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 hover:bg-orange-600 focus:outline-none`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <div className="mt-12 text-sm text-gray-500">
            <p>📍 Head Office: 123 Tech Avenue, Silicon Valley, USA</p>
            <p>📞 Helpline: +1 800 123 4567</p>
            <p>📧 Email: support@gadgetshub.com</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Contact;
