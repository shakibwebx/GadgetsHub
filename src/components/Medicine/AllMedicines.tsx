'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, Grid3x3, List, SlidersHorizontal, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import FilterSidebar from '@/components/Filter/FilterSidebar';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import MedicineCard from './MedicineCard';
import { IMedicine } from '@/types';
import { setFilters } from '@/redux/features/productSlice';

export default function AllMedicines() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const limit = 12;
  const [allMedicines, setAllMedicines] = useState<IMedicine[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lastMedicineElementRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { search, filters } = useAppSelector((state) => state.Medicines);

  // Query parameters
  const queryParams = {
    searchTerm: search,
    tags: filters.tags,
    symptoms: filters.symptoms,
    type: filters.type || undefined,
    categories: filters.categories,
    minPrice: filters.price[0],
    maxPrice: filters.price[1],
    inStock: filters.inStock === 'all' ? undefined : filters.inStock,
    requiredPrescription:
      filters.requiredPrescription === 'all'
        ? undefined
        : filters.requiredPrescription,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    page,
    limit,
  };

  const { data, isLoading, error, refetch } = useGetAllProductQuery(queryParams, {
    skip: !hasMore, // Prevent fetching if no more data
  });

  // Reset when filters/search change
  useEffect(() => {
    setPage(1);
    setAllMedicines([]);
    setHasMore(true);
  }, [search, filters]);

  // Add new data to the list
  useEffect(() => {
    if (data?.data?.data) {
      const fetchedMedicines = data.data.data;
      const total = data.data.meta?.total || 0;

      setAllMedicines((prev) => {
        const newData = page === 1 ? fetchedMedicines : [...prev, ...fetchedMedicines];
        setHasMore(newData.length < total);
        return newData;
      });

      setIsLoadingMore(false);
    }
  }, [data, page]);

  // Infinite scroll observer
  const lastMedicineRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsLoadingMore(true);
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isLoadingMore]
  );

  const handleResetAllFilters = () => {
    dispatch(
      setFilters({
        searchTerm: '',
        tags: [],
        symptoms: [],
        inStock: 'all',
        // requiredPrescription: 'all',
        price: [0, 200000],
        type: '',
        categories: [],
        sortBy: '',
        sortOrder: '',
      })
    );
  };

  if (error) {
    const safeError = error instanceof Error ? error : new Error('Unknown error');
    return (
      <div className="py-10 text-center text-red-500">
        <p>Something went wrong: {safeError.message}</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const activeFiltersCount = [
    !!filters.categories?.length,
    !!filters.symptoms?.length,
    !!filters.tags?.length,
    filters.inStock !== 'all',
    // filters.requiredPrescription !== 'all',
    filters.price[0] > 0 || filters.price[1] < 200000,
    !!filters.type,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-8 h-8 text-[#ff6e18]" />
              <h1 className="text-4xl md:text-5xl font-extrabold">
                Shop{' '}
                <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                  Products
                </span>
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Discover our wide range of premium gadgets and accessories
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-4 md:p-6">
        {/* Mobile Drawer */}
        <div className="mb-6 flex gap-3 md:hidden">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button className="flex-1 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white hover:opacity-90">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters & Search</DrawerTitle>
              <DrawerDescription>
                Find the right Medicine for your health
              </DrawerDescription>
            </DrawerHeader>
            <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
              <FilterSidebar />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <div className="sticky top-4">
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {/* Top Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
            <div className="flex-1">
              {search && (
                <div className="mb-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-3 border border-blue-100">
                  <p className="text-sm text-gray-700">
                    Search results for: <strong className="text-blue-600">&quot;{search}&quot;</strong>
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                    {data?.data?.meta?.total || 0}
                  </span>{' '}
                  Products Found
                </p>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetAllFilters}
                    className="text-xs border-[#ff6e18] text-[#ff6e18] hover:bg-[#ff6e18] hover:text-white"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear All ({activeFiltersCount})
                  </Button>
                )}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Medicine Cards */}
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
            : 'flex flex-col gap-4'}>
            {isLoading && page === 1 ? (
              Array(8)
                .fill(0)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="h-96 animate-pulse rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg"
                  ></motion.div>
                ))
            ) : allMedicines.length > 0 ? (
              allMedicines.map((Medicine: IMedicine, index: number) => {
                const isLast = index === allMedicines.length - 1;
                return (
                  <motion.div
                    key={Medicine._id || index}
                    ref={isLast ? lastMedicineRef : null}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <MedicineCard Medicine={Medicine} viewMode={viewMode} />
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full flex flex-col items-center py-20 text-center"
              >
                <Package className="w-20 h-20 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                <Button
                  onClick={handleResetAllFilters}
                  className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white hover:opacity-90"
                >
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </div>

          {/* Loading More Spinner */}
          {isLoadingMore && (
            <div className="mt-8 flex justify-center">
              <div className="relative">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#ff6e18]"></div>
                <div className="absolute inset-0 h-12 w-12 rounded-full bg-gradient-to-r from-[#ff6e18]/20 to-[#ff8c42]/20 blur-xl"></div>
              </div>
            </div>
          )}

          {/* No More Results */}
          {!hasMore && allMedicines.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full">
                <Package className="w-5 h-5 text-gray-600" />
                <p className="text-gray-700 font-semibold">You have seen all products</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
