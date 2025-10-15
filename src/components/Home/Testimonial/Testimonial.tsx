'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Star, ShoppingBag, CheckCircle, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Jessica M.',
    image: '/user-1.jpeg',
    location: 'New York, USA',
    rating: 5,
    review:
      "I love the gadget I purchased! The build quality is excellent, and the performance is top-notch. I have gotten so many compliments on it. Will definitely shop here again!",
    item: 'Wi-Fi Video Doorbell',
    price: '$150.00',
    itemImage: '/product-doorbell.png',
    date: '2 weeks ago',
  },
  {
    name: 'Lisa P.',
    image: '/user-2.jpeg',
    location: 'London, UK',
    rating: 5,
    review:
      "I was pleasantly surprised by how fast my order arrived. The customer service team was helpful and responsive. Great shopping experience!",
    item: 'Amazfit Bip 5 Smart Watch 46mm',
    price: '$120.00',
    itemImage: '/product-watch.png',
    date: '1 month ago',
  },
  {
    name: 'Vineta P.',
    image: '/user-3.jpeg',
    location: 'Sydney, Australia',
    rating: 5,
    review:
      "The quality of the electronics exceeded my expectations. Every device feels premium, and the performance is outstanding. I am absolutely impressed.",
    item: 'Instax Mini 12 Camera',
    price: '$130.00',
    itemImage: '/product-camera.png',
    date: '3 weeks ago',
  },
  {
    name: 'Michael R.',
    image: '/user-4.jpg',
    location: 'Toronto, Canada',
    rating: 5,
    review:
      "Amazing products and even better service! The gadgets are high-quality and worth every penny. Shipping was super fast too. Highly recommended!",
    item: 'Wireless Earbuds Pro',
    price: '$99.00',
    itemImage: '/product-camera.png',
    date: '1 week ago',
  },
];

const Testimonial = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background Decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff6e18]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] rounded-full">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our products
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '50K+', label: 'Happy Customers' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '15K+', label: 'Reviews' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={32}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
                centeredSlides: false,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="group h-full bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-xl hover:shadow-2xl hover:border-[#ff6e18]/50 transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="w-16 h-16 text-[#ff6e18]" />
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="relative">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover border-4 border-[#ff6e18]/20"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{t.name}</h3>
                      <p className="text-sm text-gray-500">{t.location}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-gray-700 leading-relaxed mb-6 relative z-10 line-clamp-4">
                    "{t.review}"
                  </p>

                  {/* Purchase Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-[#ff6e18]/10 rounded-lg">
                        <ShoppingBag className="w-4 h-4 text-[#ff6e18]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Purchased</p>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{t.item}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                        {t.price}
                      </p>
                      <p className="text-xs text-gray-500">{t.date}</p>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">Verified Purchase</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;