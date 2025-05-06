'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import Image from 'next/image';

const testimonials = [
  {
    name: 'Jessica M.',
    image: '/user-1.jpeg',
    rating: 5,
    review:
      'I love the gadget I purchased! The build quality is excellent, and the performance is top-notch. I’ve gotten so many compliments on it. Will definitely shop here again!',
    item: 'Wi-Fi Video Doorbell',
    price: '$150.00',
    itemImage: '/product-doorbell.png',
  },
  {
    name: 'Lisa P.',
    image: '/user-2.jpeg',
    rating: 5,
    review:
      'I was pleasantly surprised by how fast my order arrived. The customer service team was helpful and responsive. Great shopping experience!',
    item: 'Amazfit Bip 5 Smart Watch 46mm',
    price: '$120.00',
    itemImage: '/product-watch.png',
  },
  {
    name: 'Vineta P.',
    image: '/user-3.jpeg',
    rating: 5,
    review:
      'The quality of the electronics exceeded my expectations. Every device feels premium, and the performance is outstanding. I’m absolutely impressed.',
    item: 'Instax Mini 12 Camera',
    price: '$130.00',
    itemImage: '/product-camera.png',
  },
];

const Testimonial = () => {
  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-4xl font-bold">Happy Customers</h2>
      <div className="relative mx-auto max-w-7xl px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={1}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          pagination={{ clickable: true }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="">
              <div className="mx-auto max-w-4xl rounded-2xl border p-8 shadow-md md:flex md:justify-between md:gap-8">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{t.name} <span className="text-sm text-gray-500 italic">Verified Buyer</span></h3>
                  <div className="mt-2 text-green-600">{'★'.repeat(t.rating)}</div>
                  <p className="mt-4 text-gray-700 text-sm md:text-base">{t.review}</p>
                </div>
                <div className="mt-6 flex items-center gap-4 md:mt-0">
                  {/* <Image
                    src={t.itemImage}
                    alt={t.item}
                    width={50}
                    height={50}
                    className="rounded"
                  /> */}
                  <div>
                    <p className="text-xs text-gray-600">Item purchased:</p>
                    <p className="text-sm font-semibold text-black">{t.item}</p>
                    <p className="text-sm font-bold text-black">{t.price}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-4 text-center" />
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;