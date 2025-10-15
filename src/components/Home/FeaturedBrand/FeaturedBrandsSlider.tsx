'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

// Brand logos
import Image from 'next/image';

const brands = [
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    name: 'Samsung',
    gradient: 'from-blue-600 to-blue-400',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    name: 'Sony',
    gradient: 'from-red-600 to-red-400',
    bgGradient: 'from-red-50 to-red-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    name: 'Microsoft',
    gradient: 'from-cyan-600 to-cyan-400',
    bgGradient: 'from-cyan-50 to-cyan-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    name: 'Google',
    gradient: 'from-yellow-600 to-yellow-400',
    bgGradient: 'from-yellow-50 to-yellow-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    name: 'Apple',
    gradient: 'from-gray-800 to-gray-600',
    bgGradient: 'from-gray-50 to-gray-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
    name: 'Asus',
    gradient: 'from-orange-600 to-orange-400',
    bgGradient: 'from-orange-50 to-orange-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
    name: 'Lenovo',
    gradient: 'from-red-700 to-red-500',
    bgGradient: 'from-red-50 to-red-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
    name: 'HP',
    gradient: 'from-blue-700 to-blue-500',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    name: 'Dell',
    gradient: 'from-cyan-700 to-cyan-500',
    bgGradient: 'from-cyan-50 to-cyan-100'
  },
];

const FeaturedBrandsSlider = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesPerView(6);
      } else if (window.innerWidth >= 1000) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 576) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 400) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#ff6e18]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] rounded-full">
            <Award className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">TRUSTED PARTNERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
              Brands
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Shop from the world's leading tech brands
          </p>
        </motion.div>

        {/* Brands Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.brand-prev',
              nextEl: '.brand-next',
            }}
            className="pb-4"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group cursor-pointer"
                >
                  <div className={`relative bg-gradient-to-br ${brand.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-200 overflow-hidden`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    {/* Content */}
                    <div className="relative flex flex-col items-center justify-center gap-4 min-h-[140px]">
                      {/* Brand Logo */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          unoptimized
                        />
                      </div>

                      {/* Brand Name */}
                      <span className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-[#ff6e18] transition-all duration-300">
                        {brand.name}
                      </span>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="brand-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ff6e18] hover:to-[#ff8c42] hover:text-white group hidden md:flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </button>
          <button className="brand-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ff6e18] hover:to-[#ff8c42] hover:text-white group hidden md:flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: '100+', label: 'Premium Brands' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '1000+', label: 'Products Available' },
            { number: '24/7', label: 'Customer Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBrandsSlider;
