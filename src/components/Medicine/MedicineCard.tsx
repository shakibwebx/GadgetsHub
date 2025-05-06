'use client';

import { IMedicine } from '@/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  Medicine: IMedicine;
}

export default function MedicineCard({ Medicine }: Props) {
  const {
    _id,
    name,
    price,
    discount,
    quantity,
    type,
    categories,
    imageUrl,
  } = Medicine;

  const calculateTotalPrice = ({
    price,
    discount,
  }: {
    price: number;
    discount: number;
  }) => {
    const discountedAmount = price * (discount / 100);
    const discountedPrice = price - discountedAmount;
    return {
      discountedPrice: discountedPrice,
    };
  };

  const result = calculateTotalPrice({ price, discount });

  return (
    <div className="group relative mx-auto w-full max-w-sm rounded-3xl border border-gray-200 bg-white/60 p-4 shadow-md backdrop-blur transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 rounded-full bg-[#FF6E18] px-3 py-1 text-xs font-semibold text-white shadow-md">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-4 space-y-2 text-center">
        <h3 className="truncate text-lg font-semibold text-gray-800">
          {name}
        </h3>

        <p className="text-sm text-gray-500">
          {type} • {quantity} units
        </p>

        {/* Price Section */}
        {discount ? (
          <div className="flex justify-center items-center gap-2">
            <span className="text-xl font-bold text-[#FF6E18]">
              ${result.discountedPrice.toFixed(2)}
            </span>
            <del className="text-sm text-gray-400">${price.toFixed(2)}</del>
          </div>
        ) : (
          <p className="text-xl font-bold text-[#FF6E18]">
            ${price.toFixed(2)}
          </p>
        )}

        {/* Tags */}
        <div className="mt-1 flex flex-wrap justify-center gap-1 text-xs">
          {categories?.[0] && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
              {categories[0]}
            </span>
          )}
          {type && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-[#FF6E18]">
              {type}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link href={`/shop/${_id}`} passHref>
          <Button
            className="mt-4 w-full rounded-full bg-[#FF6E18] text-white transition-colors hover:bg-[#e75e10]"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
