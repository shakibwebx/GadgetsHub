'use client';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ShoppingCart,
  Star,
  Zap,
  Award,
  Package,
  CheckCircle,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useParams } from "next/navigation"
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { IMedicine } from '@/types';
import {
  useGetAllProductQuery,
  useGetSingleProductQuery,
} from '@/redux/api/productApi';
import Image from 'next/image';
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function MedicineDetails({ id }: { id: string }) {
  //   const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetSingleProductQuery(id as string);
  const { data: Medicines } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // console.log('this is Medicine data from Medicine details page', Medicines);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="h-[500px] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-red-100 p-3">
              <RotateCcw className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-medium">
              Error Loading Medicine Details
            </h3>
            <p className="text-muted-foreground">
              We could not load the details for this Medicine. Please try again.
            </p>
            <Button asChild variant="outline">
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const Medicine: IMedicine = data.data;
  // console.log('hi this is data from details page ', Medicine);

  const handleAddToCart = () => {
    dispatch(addToCart(Medicine));
    toast.success(`${Medicine.name} added to cart!`);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(Medicine));
    toast.success('Proceeding to checkout!');
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  return (
    <DefaultLayout>
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <Link href="/shop">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Shop</span>
            </motion.button>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#ff6e18] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#ff6e18] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white">{Medicine.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 bg-gradient-to-b from-gray-50 to-white">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Truck, text: 'Free Shipping', subtext: 'Orders $100+' },
            { icon: Shield, text: '2 Year Warranty', subtext: 'Full Coverage' },
            { icon: RotateCcw, text: '30-Day Returns', subtext: 'Hassle-Free' },
            { icon: Award, text: 'Authentic', subtext: '100% Genuine' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-2 bg-[#ff6e18]/10 rounded-lg">
                <badge.icon className="w-5 h-5 text-[#ff6e18]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{badge.text}</p>
                <p className="text-xs text-gray-500">{badge.subtext}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative group overflow-hidden rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
              {Medicine.discount > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="relative">
                    <div className="px-4 py-2 bg-red-500 rounded-full shadow-lg">
                      <span className="text-xl font-bold text-white">-{Medicine.discount}%</span>
                    </div>
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  </div>
                </div>
              )}
              <Image
                width={600}
                height={600}
                src={Medicine.imageUrl || '/placeholder.svg?height=600&width=600'}
                alt={Medicine.name || 'Product image'}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-3">
              {[Medicine.imageUrl, Medicine.imageUrl, Medicine.imageUrl, Medicine.imageUrl].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-1 h-24 cursor-pointer overflow-hidden rounded-xl border-2 ${
                    selectedImage === i ? 'border-[#ff6e18] shadow-lg' : 'border-gray-200'
                  } transition-all duration-300`}
                >
                  <Image
                    width={120}
                    height={120}
                    src={img || '/placeholder.svg?height=120&width=120'}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {Medicine.inStock && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full mb-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">In Stock</span>
                    </div>
                  )}
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                    {Medicine.name}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full ${
                      isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
                    } shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-100 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">(4.8 out of 5)</span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">250+ Reviews</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Medicine.categories[0] && (
                  <Badge className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                    {Medicine.categories[0]}
                  </Badge>
                )}
                <Badge className="px-3 py-1 bg-orange-100 text-[#ff6e18] rounded-full font-medium">
                  {Array.isArray(Medicine.type) ? Medicine.type.join(', ') : Medicine.type}
                </Badge>
                {Medicine.manufacturer && (
                  <Badge className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {Medicine.manufacturer}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                {Medicine.discount > 0 ? (
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                        ৳{calculateDiscountedPrice(Medicine.price, Medicine.discount).toFixed(2)}
                      </span>
                      <del className="text-2xl text-gray-400">৳{Medicine.price.toFixed(2)}</del>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        Save ৳{(Medicine.price - calculateDiscountedPrice(Medicine.price, Medicine.discount)).toFixed(2)} ({Medicine.discount}% OFF)
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                    ৳{Medicine.price.toFixed(2)}
                  </span>
                )}
                <p className="text-sm text-gray-600 mt-2">Free shipping on orders over ৳100</p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">About this product</h3>
              <p className="text-gray-600 leading-relaxed">{Medicine.description}</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Manufacturer', value: Medicine.manufacturer },
                { label: 'Available Units', value: `${Medicine.quantity} units` },
                { label: 'Category', value: Medicine.categories[0] },
                { label: 'Type', value: Array.isArray(Medicine.type) ? Medicine.type.join(', ') : Medicine.type },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-bold text-gray-900 mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-4 py-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </motion.button>
                  <div className="px-6 py-3 font-bold text-gray-900 min-w-[60px] text-center border-x-2 border-gray-200">
                    {quantity}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={incrementQuantity}
                    disabled={quantity >= Medicine.quantity}
                    className="px-4 py-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>{Medicine.quantity} available</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex-1 px-6 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Tabs defaultValue="details" className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200">
            <TabsList className="w-full justify-start bg-gray-100 p-2 rounded-xl">
              <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6e18] data-[state=active]:to-[#ff8c42] data-[state=active]:text-white">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6e18] data-[state=active]:to-[#ff8c42] data-[state=active]:text-white">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6e18] data-[state=active]:to-[#ff8c42] data-[state=active]:text-white">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {Medicine.name} is a high-quality {Medicine.type} product
                    manufactured by {Medicine.manufacturer}.
                    {Medicine.requiredPrescription &&
                      ' This product requires a prescription from a licensed healthcare provider.'}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{Medicine.description}</p>
                </div>

                {Medicine.symptoms && Medicine.symptoms.length > 0 && (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      Common Symptoms Treated
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Medicine.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Manufacturer', value: Medicine.manufacturer },
                    { label: 'Type', value: Medicine.type },
                    { label: 'Categories', value: Array.isArray(Medicine.categories) ? Medicine.categories.join(', ') : Medicine.categories },
                    { label: 'SKU', value: Medicine.sku || 'N/A' },
                    { label: 'Expiry Date', value: Medicine.expiryDate ? new Date(Medicine.expiryDate).toLocaleDateString() : 'N/A' },
                    { label: 'Prescription Required', value: Medicine.requiredPrescription ? 'Yes' : 'No' },
                    { label: 'Stock Status', value: Medicine.inStock ? 'In Stock' : 'Out of Stock' },
                    { label: 'Quantity Available', value: Medicine.quantity.toString() },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="font-semibold text-gray-700">{spec.label}</span>
                      <span className={`font-bold ${spec.label === 'Stock Status' && Medicine.inStock ? 'text-green-600' : 'text-gray-900'}`}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">4.8 out of 5</span>
                      <span className="text-sm text-gray-500">(250 reviews)</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-semibold rounded-xl shadow-lg"
                  >
                    Write a Review
                  </motion.button>
                </div>

                <div className="p-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">You Might Also Like</h2>
              <p className="text-gray-600">Discover similar premium products</p>
            </div>
            <Link href="/shop">
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-[#ff6e18] font-semibold hover:gap-3 transition-all"
              >
                View All
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Medicines?.data?.data?.length > 0
              ? Medicines.data.data
                  .filter((item: IMedicine) => item._id !== Medicine._id)
                  .slice(0, 4)
                  .map((relatedMedicine: IMedicine, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <Link href={`/shop/${relatedMedicine._id}`}>
                        <div className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-2xl hover:border-[#ff6e18]/50 transition-all duration-300">
                          {/* Discount Badge */}
                          {relatedMedicine.discount > 0 && (
                            <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-red-500 rounded-full shadow-lg">
                              <span className="text-xs font-bold text-white">-{relatedMedicine.discount}%</span>
                            </div>
                          )}

                          {/* Image */}
                          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                            <Image
                              width={300}
                              height={300}
                              src={relatedMedicine.imageUrl || '/placeholder.svg?height=300&width=300'}
                              alt={relatedMedicine.name || 'Related Product'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#ff6e18] transition-colors">
                              {relatedMedicine.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, idx) => (
                                <Star key={idx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                            </div>

                            {/* Price */}
                            {relatedMedicine.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                                  ৳{calculateDiscountedPrice(relatedMedicine.price, relatedMedicine.discount).toFixed(2)}
                                </span>
                                <del className="text-sm text-gray-400">৳{relatedMedicine.price.toFixed(2)}</del>
                              </div>
                            ) : (
                              <span className="text-xl font-bold bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                                ৳{relatedMedicine.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
              : ''}
          </div>
        </motion.div>
      </div>
    </DefaultLayout>
  );
}
