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
    subtitle: 'Power Your Gadgets Seamlessly',
    tag: '🔥 Hot Deal',
    description: 'Fast wireless charging for all your devices',
  },
  {
    image:
      'https://i.ibb.co.com/FLsDg7T1/Chat-GPT-Image-May-5-2025-02-44-04-PM-removebg-preview.png',
    title: 'Stay Fit & Energized',
    subtitle: 'The Best Mice for Gaming & Work',
    tag: '⚡ New Arrival',
    description: 'Precision and comfort in every click',
  },
  {
    image:
      'https://i.ibb.co.com/FLsDg7T1/Chat-GPT-Image-May-5-2025-02-44-04-PM-removebg-preview.png',
    title: 'Your Daily Tech Companion',
    subtitle: 'Discover the Latest Gadgets',
    tag: '✨ Trending',
    description: 'Upgrade your lifestyle with cutting-edge technology',
  },
];

const HeroSlider = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAutoplayTimeLeft = (_swiper: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#ff6e18]/20 to-[#ff8c42]/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-[#ff6e18]/15 to-[#ff8c42]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-orange-100/30 to-transparent blur-3xl"></div>
      </div>

      {/* Autoplay Progress Circle */}
      <div className="absolute top-6 right-6 z-20 backdrop-blur-sm bg-white/80 rounded-full p-2 shadow-lg">
        <svg viewBox="0 0 48 48" ref={progressCircle} className="h-10 w-10 text-[#ff6e18]">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-[#ff6e18]"
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
          <SwiperSlide key={index} className="relative h-full w-full">
            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col-reverse items-center justify-center px-6 py-8 sm:flex-row sm:justify-between sm:gap-12 md:px-12 lg:px-20">
              {/* Text Content */}
              <div className="flex w-full flex-1 flex-col items-start justify-center text-left sm:items-start space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-4 w-full"
                >
                  {/* Tag Badge */}
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white rounded-full shadow-lg"
                  >
                    {slide.tag}
                  </motion.span>

                  {/* Title */}
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    {slide.title}
                  </p>

                  {/* Subtitle with Gradient */}
                  <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                    <span className="bg-gradient-to-r from-gray-900 via-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                      {slide.subtitle}
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="text-base text-gray-600 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    <Link
                      href="/shop"
                      className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#ff6e18]/50 hover:scale-105"
                    >
                      <span>Shop Now</span>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 bg-white px-8 py-3.5 font-bold text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:scale-105"
                    >
                      View More
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Image with Floating Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-6 flex w-full flex-1 items-center justify-center sm:mb-0 relative"
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    width={500}
                    height={500}
                    className="max-h-[50vh] object-contain sm:max-h-[70vh] drop-shadow-2xl"
                    priority={index === 0}
                    quality={100}
                  />
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ff6e18]/30 to-[#ff8c42]/20 blur-3xl rounded-full scale-75"></div>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
