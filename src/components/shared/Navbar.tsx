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
  Search,
  ChevronDown,
  Package,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from '../Search/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setMenuOpen(false);
  };

  const getUserInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="sticky top-0 z-50 bg-[#1E1216] shadow-lg">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] px-4 py-2 text-center text-sm font-medium text-white">
        🎉 Special Offer: Free Shipping on Orders Over $50! Limited Time Only
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Gadgets Hub"
                width={120}
                height={40}
                className="h-10 w-auto"
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="font-medium text-white transition-colors hover:text-[#ff6e18]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="font-medium text-white transition-colors hover:text-[#ff6e18]"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="font-medium text-white transition-colors hover:text-[#ff6e18]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-medium text-white transition-colors hover:text-[#ff6e18]"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden w-full max-w-md lg:block">
            <SearchBar />
          </div>

          {/* Desktop Right Icons */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!isSearchOpen)}
              className="lg:hidden"
            >
              <Search className="h-6 w-6 text-white" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative hidden lg:block"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-6 w-6 text-white transition-colors hover:text-[#ff6e18]" />
              {totalQuantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6e18] text-xs font-bold text-white">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User Menu - Desktop */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="hidden lg:flex">
                  <button className="rounded-full relative group">
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#ff6e18] ring-2 ring-transparent group-hover:ring-[#ff6e18]/30 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-[#ff6e18]/50">
                      <AvatarImage
                        src={session.user?.image || ''}
                        alt={session.user?.name || 'User'}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-[#ff6e18] to-[#ff8c42] text-white text-sm font-semibold">
                        {getUserInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online Status Indicator */}
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#1E1216] animate-pulse"></span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-3 py-2">
                      <Avatar className="h-10 w-10 border-2 border-[#ff6e18]">
                        <AvatarImage
                          src={session.user?.image || ''}
                          alt={session.user?.name || 'User'}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#ff6e18] to-[#ff8c42] text-white text-xs font-semibold">
                          {getUserInitials(session.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-semibold text-sm truncate">{session.user?.name}</span>
                        <span className="text-xs text-gray-500 truncate">
                          {session.user?.email}
                        </span>
                        <span className="text-[10px] mt-1 capitalize bg-[#ff6e18]/10 text-[#ff6e18] font-medium inline-block px-2 py-0.5 rounded-full w-fit">
                          {session.user?.role || 'User'}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.role === 'user' && (
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {session.user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <UserCog className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hidden lg:block">
                <Button className="bg-[#ff6e18] hover:bg-[#ff6e18]/90">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden"
              aria-label="Menu"
            >
              <MenuIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-800 bg-[#1E1216] px-4 py-3 lg:hidden">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between border-b bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button onClick={toggleMenu} aria-label="Close menu">
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* User Info - Mobile */}
          {session && (
            <div className="border-b bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-3 border-white shadow-xl ring-4 ring-white/30">
                    <AvatarImage
                      src={session.user?.image || ''}
                      alt={session.user?.name || 'User'}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-white text-[#ff6e18] text-lg font-bold">
                      {getUserInitials(session.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online Status Indicator */}
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white animate-pulse"></span>
                </div>
                <div className="text-white flex-1">
                  <p className="font-bold text-base">{session.user?.name}</p>
                  <p className="text-xs opacity-90 truncate">{session.user?.email}</p>
                  <p className="text-[10px] mt-0.5 opacity-75 capitalize bg-white/20 inline-block px-2 py-0.5 rounded-full">
                    {session.user?.role || 'User'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Links */}
          <div className="overflow-y-auto p-4">
            <nav className="space-y-1">
              <Link
                href="/"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/shop"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <span className="font-medium">Shop</span>
              </Link>
              <Link
                href="/about"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <span className="font-medium">About</span>
              </Link>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium">Contact</span>
              </Link>

              <div className="my-3 border-t"></div>

              {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  {session.user?.role === 'user' && (
                    <Link
                      href="/orders"
                      onClick={toggleMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <Package className="h-5 w-5" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                  )}
                  {session.user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={toggleMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <UserCog className="h-5 w-5" />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    href="/cart"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="font-medium">Cart</span>
                    {totalQuantity > 0 && (
                      <span className="ml-auto rounded-full bg-[#ff6e18] px-2 py-0.5 text-xs font-bold text-white">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>

                  <div className="my-3 border-t"></div>

                  <button
                    onClick={() => {
                      signOut();
                      toggleMenu();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/cart"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="font-medium">Cart</span>
                    {totalQuantity > 0 && (
                      <span className="ml-auto rounded-full bg-[#ff6e18] px-2 py-0.5 text-xs font-bold text-white">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>
                  <Link href="/login" onClick={toggleMenu}>
                    <Button className="mt-4 w-full bg-[#ff6e18] hover:bg-[#ff6e18]/90">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
