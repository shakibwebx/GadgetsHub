'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import MedicineCard from './MedicineCard';
import { IMedicine } from '@/types';
import { setFilters } from '@/redux/features/productSlice';

export default function AllMedicines() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
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

  const { data, isLoading, error, refetch } = useGetAllMedicineQuery(queryParams, {
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
    <div className="container mx-auto p-4">
      {/* Mobile Drawer */}
      <div className="mb-4 flex md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              Filters & Search {activeFiltersCount > 0 && `(${activeFiltersCount})`}
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
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-4">
            {search && (
              <div className="mb-2 rounded bg-blue-50 p-2 text-sm">
                <p>
                  Search results for: <strong>&quot;{search}&quot;</strong>
                </p>
              </div>
            )}

            {activeFiltersCount > 0 && (
              <div className="mb-2 flex items-center justify-between rounded bg-gray-100 p-2 text-sm">
                <p>{data?.data?.meta?.total || 0} results found with current filters</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetAllFilters}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Medicine Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading && page === 1 ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-lg bg-gray-200"
                  ></div>
                ))
            ) : allMedicines.length > 0 ? (
              allMedicines.map((Medicine: IMedicine, index: number) => {
                const isLast = index === allMedicines.length - 1;
                return (
                  <div
                    key={Medicine._id || index}
                    ref={isLast ? lastMedicineRef : null}
                  >
                    <MedicineCard Medicine={Medicine} />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center py-10 text-center text-gray-500">
                <p className="mb-4">No Medicines found matching your criteria.</p>
                <Button variant="outline" onClick={handleResetAllFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Loading More Spinner */}
          {isLoadingMore && (
            <div className="mt-6 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900"></div>
            </div>
          )}

          {/* No More Results */}
          {!hasMore && allMedicines.length > 0 && (
            <div className="mt-6 text-center text-gray-500">
              <p>You have reached the end of results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
