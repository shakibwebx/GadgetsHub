'use client';

import { Search, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState, useRef } from 'react';
import { setSearch } from '@/redux/features/productSlice';
import { useRouter, usePathname } from 'next/navigation';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.Medicines);
  const [input, setInput] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch products for suggestions
  const { data: productsResponse } = useGetAllProductQuery({
    page: 1,
    limit: 100,
  });

  const products = productsResponse?.data?.data || [];

  // Filter products based on search input
  const filteredProducts = input.trim()
    ? products.filter(
        (product: {
          name: string;
          categories?: string[];
          tags?: string[];
        }) => {
          const searchLower = input.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.categories?.some((cat) =>
              cat.toLowerCase().includes(searchLower)
            ) ||
            product.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
          );
        }
      )
    : [];

  useEffect(() => {
    setInput(search);
  }, [search]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(true);
  };

  // automatically dispatch when input is cleared
  useEffect(() => {
    if (input.trim() === '') {
      dispatch(setSearch(''));
      setShowSuggestions(false);
    }
  }, [input, dispatch]);

  const handleSearch = () => {
    dispatch(setSearch(input));
    setShowSuggestions(false);
    // navigate to shop page if not already there
    if (pathname !== '/shop') {
      router.push('/shop');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleProductClick = () => {
    setShowSuggestions(false);
    setInput('');
    dispatch(setSearch(''));
  };

  const clearSearch = () => {
    setInput('');
    dispatch(setSearch(''));
    setShowSuggestions(false);
  };

  return (
    <div className="mx-8 max-w-xl flex-1" ref={wrapperRef}>
      <div className="relative">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => input.trim() && setShowSuggestions(true)}
          placeholder="Search by name or category"
          className="w-full rounded-full bg-[#1F1F1F] text-white border-[#F27F20] pr-24"
        />
        {input && (
          <button
            onClick={clearSearch}
            className="absolute top-1/2 right-14 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button
          onClick={handleSearch}
          className="absolute top-0 right-0 h-full rounded-l-none rounded-r-full bg-[#F27F20] hover:bg-[#D66C00]"
        >
          <Search className="h-5 w-5 text-white" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && filteredProducts.length > 0 && (
          <div className="absolute top-full mt-2 w-full rounded-lg bg-white shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-semibold">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? 's' : ''} found
              </div>
              {filteredProducts.slice(0, 8).map(
                (product: {
                  _id: string;
                  name: string;
                  price: number;
                  imageUrl?: string;
                  categories?: string[];
                }) => (
                  <Link
                    key={product._id}
                    href={`/shop/${product._id}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Search className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#ff6e18]">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.categories && product.categories.length > 0 && (
                          <span className="text-xs text-gray-500">
                            • {product.categories[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {/* No Results */}
        {showSuggestions &&
          input.trim() &&
          filteredProducts.length === 0 && (
            <div className="absolute top-full mt-2 w-full rounded-lg bg-white shadow-xl border border-gray-200 p-4 z-50">
              <p className="text-sm text-gray-500 text-center">
                No products found for &quot;{input}&quot;
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
