'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu as MenuIcon,
  ShoppingBag,
  X,
  LogIn,
  LogOut,
  User,
  UserCog,
  Phone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from '../Search/SearchBar';

const iconClass = 'text-[#F27F20]';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-[#1F1F1F] shadow-md">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm text-white bg-[#1F1F1F]">
        <div>Free Shipping on Orders Over $50!</div>
        <div className="hidden gap-5 lg:flex items-center">
          {session?.user?.role === 'admin' && (
            <Link href="/admin" className="flex items-center gap-1 hover:underline">
              <UserCog className={`h-4 w-4 ${iconClass}`} /> Admin Dashboard
            </Link>
          )}
          <Link href="/profile" className="flex items-center gap-1 hover:underline">
            <User className={`h-4 w-4 ${iconClass}`} /> Profile
          </Link>
          {session?.user?.role === 'user' && (
            <Link href="/orders" className="hover:underline">Track Order</Link>
          )}
          <Link href="/contact" className="flex items-center gap-1 hover:underline">
            <Phone className={`h-4 w-4 ${iconClass}`} /> Contact
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 rounded bg-red-600 px-4 py-1 hover:bg-red-700"
            >
              <LogOut className={`h-4 w-4 ${iconClass}`} /> Logout
            </button>
          ) : (
            <Link href="/login" className="flex items-center gap-1 hover:underline">
              <LogIn className={`h-4 w-4 ${iconClass}`} /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex items-center  justify-between px-12 py-4 border-t border-b border-gray-700">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.webp" alt="Logo" width={100} height={40} unoptimized />
        </Link>

        {/* Search Bar */}
        <div className="hidden w-[40%] lg:block">
          <SearchBar />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link href="/cart" className="relative hidden lg:flex items-center">
            <ShoppingBag className={iconClass} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center animate-bounce">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="block text-[#F27F20] lg:hidden">
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="hidden lg:flex justify-center bg-[#1F1F1F] text-white border-b border-gray-700">
        <ul className="flex gap-6 py-3 text-sm font-medium">
          <li className="hover:text-[#F27F20] transition"><Link href="/">Home</Link></li>
          <li className="hover:text-[#F27F20] transition"><Link href="/shop">Shop</Link></li>
          <li className="hover:text-[#F27F20] transition"><Link href="/about">About</Link></li>
          <li className="hover:text-[#F27F20] transition"><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-transform duration-300 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={closeMenu}
      >
        <div className="absolute right-0 top-0 h-full w-64 bg-[#1F1F1F] p-5 shadow-lg">
          <button onClick={toggleMenu} className="mb-5 text-xl text-[#F27F20]">
            <X />
          </button>

          <div className="mb-4">
            <SearchBar />
          </div>

          <ul className="space-y-4 text-white text-sm">
            <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/shop" onClick={toggleMenu}>Shop</Link></li>
            <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
            {session?.user?.role === 'admin' && (
              <li>
                <Link href="/admin" onClick={toggleMenu} className="flex items-center gap-1">
                  <UserCog className={`h-4 w-4 ${iconClass}`} /> Admin
                </Link>
              </li>
            )}
            <li>
              <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-1">
                <User className={`h-4 w-4 ${iconClass}`} /> Profile
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={toggleMenu}>Cart ({totalQuantity})</Link>
            </li>
            {session?.user?.role === 'user' && (
              <li><Link href="/orders" onClick={toggleMenu}>Track Order</Link></li>
            )}
            <li>
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded"
                >
                  <LogOut className={`h-4 w-4 ${iconClass}`} /> Logout
                </button>
              ) : (
                <Link href="/login" onClick={toggleMenu} className="flex items-center gap-1">
                  <LogIn className={`h-4 w-4 ${iconClass}`} /> Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
