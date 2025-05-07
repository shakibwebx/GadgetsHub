import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Banner = () => {
  return (
    <section className="bg-[#f5f5f5] py-12">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
        {/* Text Content */}
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <h2 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl">
            Unmatched Performance
          </h2>
          <p className="text-base text-gray-700 sm:text-lg">
            Upgrade your devices with cutting-edge technology that powers your
            productivity and entertainment.
          </p>
          <Link href="/shop">
            <Button className="rounded-xl bg-[#F27F20] px-6 py-2 text-sm text-white hover:bg-[#e06d12] sm:text-base">
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/phone.png"
            alt="Smartphone showcasing performance"
            width={500}
            height={300}
            className="w-full max-w-md object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
