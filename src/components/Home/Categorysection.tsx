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

const categories = [
  { name: 'Smart Watch', icon: <Watch className="h-10 w-10 text-[#F27F20]" /> },
  { name: 'Smartphone', icon: <Smartphone className="h-10 w-10 text-[#F27F20]" /> },
  { name: 'Laptop', icon: <Laptop className="h-10 w-10 text-[#F27F20]" /> },
  { name: 'PC', icon: <Monitor className="h-10 w-10 text-[#F27F20]" /> },
  { name: 'Airbuds', icon: <Headphones className="h-10 w-10 text-[#F27F20]" /> },
];

const CategorySection = () => {
  return (
    <section className="bg-[#f5f5f5] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="bg-white text-center shadow-sm border border-gray-200 hover:shadow-md transition rounded-2xl p-5">
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  {category.icon}
                  <span className="text-gray-900 font-medium">{category.name}</span>
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
