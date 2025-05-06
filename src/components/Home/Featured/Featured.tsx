'use client';

import { IMedicine } from '@/types';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const Featured = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const MedicineData: IMedicine[] = data?.data?.data;

  // Sort by createdAt descending and take latest 8
  const featuredProducts = MedicineData
    ?.slice()
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 8);

  return (
    <section className="my-20 px-6 md:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Featured Products</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Discover the best Medicines selected just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts?.map((product: IMedicine) => (
          <div
            key={product._id}
            className="group relative transition-all duration-300 border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={product.imageUrl || '/placeholder-image.png'}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="p-4 space-y-3">
              <h3 className="truncate text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

              <p className="font-bold text-[#FF6E18] text-lg">
                ${product.price}
              </p>

              <Link href={`/shop/${product._id}`} passHref>
                <Button className="mt-3 w-full rounded-lg bg-[#FF6E18] text-white transition-colors hover:bg-[#e75e10]">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
