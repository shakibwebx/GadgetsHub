'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const slides = [
  {
    image:
      'https://i.ibb.co.com/qLb52kJq/Chat-GPT-Image-May-5-2025-02-51-54-PM.png',
    title: 'Apple MagSafe Charger',
    subtitle: 'Next-Level Tech',
  },
  {
    image:
      'https://i.ibb.co.com/FLsDg7T1/Chat-GPT-Image-May-5-2025-02-44-04-PM-removebg-preview.png',
    title: 'Stay Fit & Energized',
    subtitle: 'Best mouses for You',
  },
  {
    image:
      'https://i.ibb.co.com/FLsDg7T1/Chat-GPT-Image-May-5-2025-02-44-04-PM-removebg-preview.png',
    title: 'Your Daily Health Partner',
    subtitle: 'Discover Natural Remedies',
  },
];

const HeroSlider = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (_swiper: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        String(1 - progress)
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div
      className="relative h-[85vh] w-full overflow-hidden"
      style={{ backgroundColor: '#e9eaf8' }}
    >
      {/* Autoplay Progress Circle */}
      <div className="absolute top-4 right-4 z-20">
        <svg
          viewBox="0 0 48 48"
          ref={progressCircle}
          className="h-12 w-12 text-[#129ead]"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray="125.6"
            strokeDashoffset="calc(125.6 * var(--progress, 1))"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <span
          ref={progressContent}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs font-semibold text-[#282828]"
        ></span>
      </div>

      <Swiper
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative !h-full !w-full">
            <div className="relative z-10 gap-16 mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-20">
              {/* Image */}
              <div className="h-full flex-1 flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  width={400}
                  height={400}
                  className="object-contain max-h-[70vh]"
                  priority={index === 0}
                  quality={100}
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col items-start justify-center text-left px-6 sm:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm font-medium text-gray-500 uppercase mb-2">
                    {slide.title}
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {slide.subtitle}
                  </h2>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Link
                      href="/shop"
                      className="inline-block rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                    >
                      Shop Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
