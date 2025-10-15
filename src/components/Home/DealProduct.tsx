'use client';

import { useGetAllProductQuery } from '@/redux/api/productApi';
import { IMedicine } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Flame, ShoppingCart, Star, TrendingDown, Zap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const DealProduct = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const { data, isLoading } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: IMedicine) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

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
      discountedPrice,
    };
  };

  // Get day of year to rotate products daily
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear();

  const MedicineData: (IMedicine & { discountedPrice: number })[] =
    data?.data?.data
      ?.filter((item: IMedicine) => item.discount && item.discount > 0)
      .sort((a: IMedicine, b: IMedicine) => {
        // Sort by discount first
        const discountDiff = (b.discount || 0) - (a.discount || 0);
        if (discountDiff !== 0) return discountDiff;
        // Then by name for consistency
        return a.name.localeCompare(b.name);
      })
      .map((item: IMedicine, index: number, arr: IMedicine[]) => {
        // Rotate products based on day of year
        const rotatedIndex = (index + dayOfYear) % arr.length;
        return arr[rotatedIndex];
      })
      .slice(0, 2)
      .map((item: IMedicine) => {
        const { discountedPrice } = calculateTotalPrice({
          price: item.price,
          discount: item.discount || 0,
        });

        return {
          ...item,
          discountedPrice,
        };
      });

  if (isLoading) {
    return (
      <section className="my-20 px-6 md:px-12">
        <div className="flex flex-col gap-8 md:flex-row">
          {[1, 2].map((i) => (
            <div key={i} className="w-full animate-pulse">
              <div className="h-96 bg-gray-200 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!MedicineData || MedicineData.length === 0) {
    return null;
  }

  return (
    <section className="relative my-20 px-6 md:px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#ff6e18]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
            <Flame className="w-4 h-4 text-white animate-pulse" />
            <span className="text-xs font-bold text-white">LIMITED TIME OFFER</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Deal of the{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Day
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Get exclusive discounts on premium gadgets - Limited stock available!
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-full"
          >
            <Clock className="w-5 h-5 text-[#ff6e18]" />
            <span className="text-white font-bold">Ends in:</span>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs text-gray-400">Hours</span>
              </div>
              <span className="text-white font-bold">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs text-gray-400">Mins</span>
              </div>
              <span className="text-white font-bold">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs text-gray-400">Secs</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Products */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {MedicineData?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group w-full"
            >
              <div className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white md:flex-row h-full">
                {/* Hot Deal Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg">
                  <Zap className="w-4 h-4 text-white fill-current" />
                  <span className="text-xs font-bold text-white">HOT DEAL</span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative">
                    <div className="px-4 py-2 bg-red-500 rounded-full shadow-lg">
                      <span className="text-2xl font-bold text-white">-{product.discount}%</span>
                    </div>
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative flex h-80 w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 md:w-1/2 overflow-hidden">
                  <Link href={`/shop/${product._id}`}>
                    <Image
                      src={product.imageUrl || '/placeholder-image.png'}
                      alt={product.name}
                      width={320}
                      height={320}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Details */}
                <div className="flex w-full flex-col justify-between p-6 md:p-8 md:w-1/2">
                  <div className="space-y-4">
                    <Link href={`/shop/${product._id}`}>
                      <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-[#ff6e18] transition-colors duration-300">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price Section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <del className="text-xl text-gray-400">৳{product.price.toFixed(2)}</del>
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                          ৳{product.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-green-600 font-semibold">
                          Save ৳{(product.price - product.discountedPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Stock Info */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-700">Only few items left!</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                    <Link href={`/shop/${product._id}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300"
                      >
                        View Details
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealProduct;
