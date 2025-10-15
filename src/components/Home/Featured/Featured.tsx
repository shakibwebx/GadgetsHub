'use client';

import { IMedicine } from '@/types';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star, TrendingUp, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'sonner';
import { useState } from 'react';

const Featured = () => {
  const dispatch = useDispatch();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const { data, isLoading } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const MedicineData: IMedicine[] = data?.data?.data;

  // Sort by createdAt descending and take latest 8
  const featuredProducts = MedicineData
    ?.slice()
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 8);

  const handleAddToCart = (product: IMedicine) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.info('Removed from wishlist');
      } else {
        newSet.add(id);
        toast.success('Added to wishlist');
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <section className="my-20 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative my-20 px-6 md:px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#ff6e18]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">TRENDING NOW</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium gadgets and latest tech innovations
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts?.map((product: IMedicine, index: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative transition-all duration-300 border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden bg-white">
                {/* New Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] rounded-full shadow-lg">
                  <TrendingUp className="w-3 h-3 text-white" />
                  <span className="text-xs font-bold text-white">NEW</span>
                </div>

                {/* Product Image */}
                <Link href={`/shop/${product._id}`}>
                  <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.imageUrl || '/placeholder-image.png'}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(product._id)}
                    className={`p-2.5 rounded-full ${favoriteIds.has(product._id) ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <Heart className={`w-4 h-4 ${favoriteIds.has(product._id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  <Link href={`/shop/${product._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  <Link href={`/shop/${product._id}`}>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#ff6e18] transition-colors duration-300">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                  </div>

                  {/* Price & Cart Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                        ৳{product.price}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Add</span>
                    </motion.button>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              View All Products
              <Eye className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
