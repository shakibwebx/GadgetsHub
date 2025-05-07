'use client';

import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { IMedicine } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const DealProduct = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

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
      discountedPrice,
    };
  };

  const MedicineData: (IMedicine & { discountedPrice: number })[] =
    data?.data?.data
      ?.filter((item: IMedicine) => item.discount && item.discount > 0)
      .slice(0, 2)
      .map((item: IMedicine) => {
        const { discountedPrice } = calculateTotalPrice({
          price: item.price,
          discount: item.discount || 0,
        });

        return {
          ...item,
          discountedPrice,
        };
      });

  return (
    <section className="my-20 px-6 md:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[#1E1216]">Deal of the Day</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Get exclusive discounts on select Gadgets!
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {MedicineData?.map((product) => (
          <div
            key={product._id}
            className="flex w-full flex-col overflow-hidden rounded-2xl border border-border shadow-md hover:shadow-xl transition-all duration-300 bg-background md:flex-row"
          >
            {/* Image */}
            <div className="flex h-72 w-full items-center justify-center bg-muted md:w-1/2">
              <Image
                src={product.imageUrl || '/placeholder-image.png'}
                alt={product.name}
                width={280}
                height={280}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex w-full flex-col justify-between p-6 md:w-1/2">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 text-lg mt-2">
                  <del className="text-muted-foreground">${product.price.toFixed(2)}</del>
                  <p className="font-bold text-green-500">${product.discountedPrice.toFixed(2)}</p>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                    -{product.discount}%
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link href={`/shop/${product._id}`} className="w-full">
                  <Button className="w-full text-sm py-2 font-medium">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealProduct;
