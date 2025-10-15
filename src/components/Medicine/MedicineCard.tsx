'use client';

import { IMedicine } from '@/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'sonner';
import { useState } from 'react';

interface Props {
  Medicine: IMedicine;
  viewMode?: 'grid' | 'list';
}

export default function MedicineCard({ Medicine, viewMode = 'grid' }: Props) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    _id,
    name,
    price,
    discount,
    quantity,
    type,
    categories,
    imageUrl,
  } = Medicine;

  const calculateTotalPrice = ({
    price,
    discount,
  }: {
    price: number;
    discount: number;
  }) => {
    const discountedAmount = price * (discount / 100);
    const discountedPrice = price - discountedAmount;
    return {
      discountedPrice: discountedPrice,
    };
  };

  const result = calculateTotalPrice({ price, discount });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(Medicine));
    toast.success(`${name} added to cart!`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative w-full rounded-3xl border-2 border-gray-200 bg-white p-4 shadow-lg hover:shadow-2xl hover:border-[#ff6e18]/50 transition-all duration-300 flex gap-6">
        {/* Image */}
        <Link href={`/shop/${_id}`} className="relative w-48 h-48 overflow-hidden rounded-2xl bg-gray-100 flex-shrink-0">
          <Image
            src={imageUrl || '/placeholder.png'}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
              -{discount}%
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/shop/${_id}`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ff6e18] transition-colors line-clamp-2">
                {name}
              </h3>
            </Link>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-2">(4.5)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {categories?.[0] && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  {categories[0]}
                </span>
              )}
              {type && (
                <span className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium text-[#ff6e18]">
                  {type}
                </span>
              )}
              <span className="px-3 py-1 bg-green-100 rounded-full text-xs font-medium text-green-700">
                {quantity} units
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {discount ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                    ৳{result.discountedPrice.toFixed(2)}
                  </span>
                  <del className="text-sm text-gray-400">৳{price.toFixed(2)}</del>
                </div>
              ) : (
                <span className="text-3xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                  ৳{price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mx-auto w-full rounded-3xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-2xl hover:border-[#ff6e18]/50 transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <Link href={`/shop/${_id}`} className="relative block h-56 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            <span className="relative">-{discount}%</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-lg hover:shadow-xl transition-all`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
          <Link href={`/shop/${_id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-5 space-y-3">
        <Link href={`/shop/${_id}`}>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#ff6e18] transition-colors min-h-[3.5rem]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.5)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs">
          {categories?.[0] && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
              {categories[0]}
            </span>
          )}
          {type && (
            <span className="px-2 py-1 bg-orange-100 rounded-full text-[#ff6e18] font-medium">
              {type}
            </span>
          )}
        </div>

        {/* Price Section */}
        <div className="pt-2">
          {discount ? (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                ৳{result.discountedPrice.toFixed(2)}
              </span>
              <del className="text-sm text-gray-400">৳{price.toFixed(2)}</del>
            </div>
          ) : (
            <p className="text-2xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent mb-3">
              ৳{price.toFixed(2)}
            </p>
          )}

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
