'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Cpu, Sparkles } from 'lucide-react';

const Banner = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff6e18]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 sm:px-8 lg:flex-row lg:px-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl space-y-8 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6e18]/20 to-[#ff8c42]/20 border border-[#ff6e18]/30 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#ff6e18]" />
            <span className="text-xs font-bold text-white">PREMIUM TECHNOLOGY</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl"
          >
            <span className="text-white">Unmatched</span>
            <br />
            <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
              Performance
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base text-gray-300 sm:text-lg leading-relaxed"
          >
            Upgrade your devices with cutting-edge technology that powers your
            productivity and entertainment to the next level.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-6 justify-center lg:justify-start"
          >
            {[
              { icon: Zap, text: 'Lightning Fast' },
              { icon: Shield, text: 'Secure & Reliable' },
              { icon: Cpu, text: 'Latest Tech' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <div className="p-2 bg-[#ff6e18]/10 rounded-lg">
                  <feature.icon className="w-4 h-4 text-[#ff6e18]" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#ff6e18]/50 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-bold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image with Floating Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6e18]/30 to-[#ff8c42]/20 rounded-full blur-3xl scale-75"></div>

            {/* Phone Image */}
            <div className="relative">
              <Image
                src="/phone.png"
                alt="Smartphone showcasing performance"
                width={500}
                height={500}
                className="w-full max-w-md object-contain drop-shadow-2xl relative z-10"
                priority
              />

              {/* Decorative Circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#ff6e18] to-[#ff8c42] rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
