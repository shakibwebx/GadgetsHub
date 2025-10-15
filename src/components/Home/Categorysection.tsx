'use client';

import {
  Watch,
  Smartphone,
  Laptop,
  Monitor,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    name: 'Smart Watch',
    icon: Watch,
    query: 'watch',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    count: '50+ Products'
  },
  {
    name: 'Smartphone',
    icon: Smartphone,
    query: 'phone',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    count: '120+ Products'
  },
  {
    name: 'Laptop',
    icon: Laptop,
    query: 'macbook',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    count: '80+ Products'
  },
  {
    name: 'PC',
    icon: Monitor,
    query: 'computer',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    count: '65+ Products'
  },
  {
    name: 'Airbuds',
    icon: Headphones,
    query: 'headphone',
    gradient: 'from-[#ff6e18] to-[#ff8c42]',
    bgGradient: 'from-orange-50 to-amber-50',
    count: '45+ Products'
  },
];

const CategorySection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-16 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff6e18]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white rounded-full">
            EXPLORE NOW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Browse by{' '}
            <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our wide range of premium gadgets and accessories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/shop?category=${encodeURIComponent(category.query)}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="group relative cursor-pointer"
                  >
                    <Card className={`relative bg-gradient-to-br ${category.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden h-full`}>
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                      <CardContent className="relative flex flex-col items-center justify-center gap-4 p-6 sm:p-8">
                        {/* Icon Container */}
                        <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white" />

                          {/* Pulse effect */}
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} animate-ping opacity-20`}></div>
                        </div>

                        {/* Category Name */}
                        <div className="text-center space-y-1">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-[#ff6e18] transition-all duration-300">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium">
                            {category.count}
                          </p>
                        </div>

                        {/* Arrow Icon */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <ArrowRight className={`h-5 w-5 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`} />
                        </div>
                      </CardContent>

                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#ff6e18]/50 transition-all duration-300"
            >
              View All Products
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
