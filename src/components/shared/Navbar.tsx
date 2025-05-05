'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

import {
  MenuIcon,
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

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (
    <div>
      {/* top bar */}
      <div className="sticky top-0 z-40 flex justify-between px-5 py-2.5 text-sm bg-[#1F1F1F] text-white">
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
            <Link href="/orders" className="hover:underline">
              Track Order
            </Link>
          )}
          <Link href="/contact" className="hover:underline flex items-center gap-1">
            <Phone className={`h-4 w-4 ${iconClass}`} /> Contact
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700 transition"
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

      {/* main navbar */}
      <div className="sticky top-[42px] z-1000 flex items-center  justify-between border border-gray-700 bg-[#1F1F1F] text-white px-5 py-4">
        <Link href="/">
          <h2 className="text-[#F27F20] text-xl font-bold">
          <Image src="/logo.webp" alt="Company Logo" width={100} height={100} />
          </h2>
        </Link>

        <button className="block text-xl lg:hidden text-[#F27F20]" onClick={toggleMenu}>
          <MenuIcon />
        </button>

        {/* searchBar */}
        <div className="hidden w-[40%] lg:block">
          <SearchBar />
        </div>

        <Link href="/cart">
          <div className="relative hidden items-center gap-3 lg:flex">
            <ShoppingBag className={iconClass} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* nav Links */}
      <nav className="hidden justify-center bg-[#1F1F1F] text-white lg:flex">
        <ul className="flex justify-center gap-6 py-4 text-sm font-medium">
          <li className="hover:text-[#F27F20] transition">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-[#F27F20] transition">
            <Link href="/shop">Shop</Link>
          </li>
          <li className="hover:text-[#F27F20] transition">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-[#F27F20] transition">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* mobile Menu */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 transition-transform lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 h-full w-64 transform bg-[#1F1F1F] text-white p-5 transition-transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-3/4'
          }`}
        >
          <button onClick={toggleMenu} className="mb-5 text-xl text-[#F27F20]">
            <X />
          </button>

          <div className="mb-4">
            <SearchBar />
          </div>

          <ul className="space-y-4">
            <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/shop" onClick={toggleMenu}>Shop</Link></li>
            <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
            {session?.user?.role === 'admin' && (
              <li>
                <Link href="/admin" onClick={toggleMenu} className="flex items-center gap-1">
                  <UserCog className={`h-4 w-4 ${iconClass}`} /> Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-1">
                <User className={`h-4 w-4 ${iconClass}`} /> Profile
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={toggleMenu}>
                Cart ({totalQuantity})
              </Link>
            </li>
            {session?.user?.role === 'user' && (
              <li><Link href="/orders" onClick={toggleMenu}>Track Order</Link></li>
            )}
            <li>
              {session ? (
                <button
                  onClick={() => {
                    toggleMenu();
                    signOut();
                  }}
                  className="flex items-center gap-1 rounded bg-red-600 px-4 py-1 text-white"
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
