'use client';

import { IMedicine } from '@/types';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Featured = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const medicineData: IMedicine[] = data?.data?.data;

  return (
    <section className="my-20 px-6 md:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Featured Products</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Discover the best medicines selected just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {medicineData?.map((product: IMedicine) => (
          <Card
            key={product._id}
            className="group transition-shadow hover:shadow-2xl border border-border h-[430px] flex flex-col justify-between overflow-hidden"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative w-[150px] h-[150px] mb-4">
                <Image
                  src={product.imageUrl || '/placeholder-image.png'}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-3 font-bold text-primary text-lg">${product.price}</p>

              <Link href={`/shop/${product._id}`} className="w-full mt-5">
                <Button className="w-full text-sm py-2 font-medium">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Featured;
