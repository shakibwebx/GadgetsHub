'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1F1F1F] text-white">
      <div className="mx-auto w-full px-6 pt-10 pb-6 lg:px-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Gadgets-Hub Home">
              <Image
                src="/logo.webp"
                alt="Gadgets-Hub Logo"
                width={100}
                height={100}
              />
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Your ultimate hub for the latest gadgets — from smartphones to
              smartwatches, delivering innovation to your doorstep.
            </p>
            <div className="mt-5 flex gap-4 text-[#F27F20]">
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#F27F20]">Products</h2>
            <ul className="text-sm space-y-3 text-gray-300">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Best Sellers</a>
              </li>
              <li>
                <a href="#">Special Offers</a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#F27F20]">Support</h2>
            <ul className="text-sm space-y-3 text-gray-300">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#F27F20]">Solutions</h2>
            <ul className="text-sm space-y-3 text-gray-300">
              <li>
                <a href="#">Device Management</a>
              </li>
              <li>
                <a href="#">Smart Home Integration</a>
              </li>
              <li>
                <a href="#">Gadget Insurance</a>
              </li>
              <li>
                <a href="#">Tech Consultancy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#1F1F1F] border-t border-gray-700 py-6 text-center text-sm text-[#F27F20]">
        © 2025 Gadgets-Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
