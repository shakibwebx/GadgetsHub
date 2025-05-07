'use client';

import {
  Watch,
  Smartphone,
  Laptop,
  Monitor,
  Headphones,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Smart Watch', icon: <Watch className="h-8 w-8 md:h-10 md:w-10 text-[#F27F20]" />, query: 'watch' },
  { name: 'Smartphone', icon: <Smartphone className="h-8 w-8 md:h-10 md:w-10 text-[#F27F20]" />, query: 'phone' },
  { name: 'Laptop', icon: <Laptop className="h-8 w-8 md:h-10 md:w-10 text-[#F27F20]" />, query: 'macbook' },
  { name: 'PC', icon: <Monitor className="h-8 w-8 md:h-10 md:w-10 text-[#F27F20]" />, query: 'computer' },
  { name: 'Airbuds', icon: <Headphones className="h-8 w-8 md:h-10 md:w-10 text-[#F27F20]" />, query: 'headphone' },
];

const CategorySection = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryQuery: string) => {
    router.push(`/shop?category=${encodeURIComponent(categoryQuery)}`);
  };

  return (
    <section className="bg-[#f5f5f5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => handleCategoryClick(category.query)}
              className="cursor-pointer"
            >
              <Card className="bg-white text-center shadow-sm border border-gray-200 hover:shadow-md transition rounded-2xl p-4 sm:p-5 h-full">
                <CardContent className="flex flex-col items-center justify-center gap-3">
                  {category.icon}
                  <span className="text-sm sm:text-base text-gray-900 font-medium">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
