'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

// Icons for top gadget brands
import { FaMicrosoft, FaGoogle } from 'react-icons/fa';
import { SiSamsung, SiSony } from 'react-icons/si';
import { SiAsus, SiLenovo, SiHp, SiDell } from 'react-icons/si';

const brands = [
  { icon: <SiSamsung />, name: 'Samsung' },
  { icon: <SiSony />, name: 'Sony' },
  { icon: <FaMicrosoft />, name: 'Microsoft' },
  { icon: <FaGoogle />, name: 'Google' },
  { icon: <SiAsus />, name: 'Asus' },
  { icon: <SiLenovo />, name: 'Lenovo' },
  { icon: <SiHp />, name: 'HP' },
  { icon: <SiDell />, name: 'Dell' },
];

const FeaturedBrandsSlider = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
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
    <section className="mx-12 my-12">
      <h2 className="mb-10 text-3xl font-bold text-center">Featured Brands</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-gray-700 hover:text-black transition">
              <div className="text-6xl">{brand.icon}</div>
              <span className="mt-2 text-sm font-medium">{brand.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedBrandsSlider;
