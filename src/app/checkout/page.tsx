'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  updateQuantity,
  removeFromCart,
  uploadPrescription,
  setCart,
} from '@/redux/features/cart/cartSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Trash2,
  ChevronLeft,
  Package,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  ShoppingBag,
  CheckCircle,
  Truck,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCreateOrderMutation } from '@/redux/features/payment/paymentSlice';
import { toast } from 'sonner';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Bangladesh',
  });

  useEffect(() => {
    if (session?.user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: session.user?.name || '',
        email: session.user?.email || '',
      }));
    }
  }, [session]);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const currentItem = cart.find((item) => item._id === id);
    if (!currentItem) return;
    const newQuantity = Math.max(1, currentItem.quantity + delta);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handlePrescriptionUpload = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_KEY;

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.url;
        dispatch(uploadPrescription({ id, prescription: imageUrl }));
        toast.success('Prescription uploaded successfully!');
      } else {
        toast.error('Error uploading prescription');
      }
    } catch (error) {
      toast.error('Error during prescription upload');
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.info('Item removed from cart');
  };

  const handleCheckout = async () => {
    if (!session?.user) {
      toast.error('Please login to proceed with checkout.');
      signIn(undefined, { callbackUrl: '/checkout' });
      return;
    }

    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      toast.error('Please fill in all required shipping information');
      return;
    }

    const nonPrescriptionItems = cart.filter(
      (item) => !item.requiredPrescription
    );
    const uploadedPrescriptionItems = cart.filter(
      (item) => item.requiredPrescription && item.prescription
    );
    const missingPrescriptionItems = cart.filter(
      (item) => item.requiredPrescription && !item.prescription
    );
    const itemsToProceed = [
      ...nonPrescriptionItems,
      ...uploadedPrescriptionItems,
    ];

    if (itemsToProceed.length === 0) {
      toast.error(
        'Please upload prescription for the required items before checkout.'
      );
      return;
    }

    const formattedItems = itemsToProceed.map((item) => ({
      product: item._id,
      name: item.name,
      quantity: item.quantity,
      prescriptionFile: item.prescription || 'notRequired',
    }));

    try {
      const res = await createOrder({
        products: formattedItems,
        deliveryType: deliveryOption,
        shippingInfo,
        pendingPrescriptions: missingPrescriptionItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
        })),
      });

      console.log('Order Response:', res);

      if ('data' in res && res?.data?.data) {
        toast.success(res?.data?.message || 'Order placed successfully!');
        if (res?.data?.data) {
          setTimeout(() => {
            window.location.href = res?.data?.data;
          }, 1000);
        }
        const remainingItems = cart.filter(
          (item) => item.requiredPrescription && !item.prescription
        );
        dispatch(setCart(remainingItems));
      } else if ('error' in res) {
        console.error('Order Error:', res.error);
        const errorMessage = (res.error as any)?.data?.message || 'Failed to process order';
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Order Exception:', err);
      toast.error('Failed to Process!');
    }
  };

  useEffect(() => {
    if (isError) {
      console.error('Order API Error:', error);
      const errorMessage = (error as any)?.data?.message || (error as any)?.message || 'Something went wrong!';
      toast.error(errorMessage);
    }
  }, [isError, error]);

  const payableItems = cart.filter(
    (item) => !item.requiredPrescription || item.prescription
  );

  const subtotal = payableItems.reduce(
    (sum, item) =>
      sum + calculateDiscountedPrice(item.price, item.discount || 0) * item.quantity,
    0
  );

  const deliveryFee = deliveryOption === 'standard' ? 3 : 6;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <DefaultLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-bold rounded-xl shadow-lg"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <Link href="/cart">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Cart</span>
            </motion.button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              Checkout
            </h1>
            <p className="text-gray-300 text-lg">Complete your purchase</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 bg-gradient-to-b from-gray-50 to-white">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: Shield, text: 'Secure Payment' },
            { icon: Truck, text: 'Fast Delivery' },
            { icon: CheckCircle, text: 'Money Back Guarantee' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <badge.icon className="w-5 h-5 text-[#ff6e18]" />
              <span className="text-sm font-semibold text-gray-900">{badge.text}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Shipping & Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] p-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-[#ff6e18]" />
                        Full Name *
                      </Label>
                      <Input
                        placeholder="John Doe"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                      />
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-[#ff6e18]" />
                        Email *
                      </Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#ff6e18]" />
                      Phone Number *
                    </Label>
                    <Input
                      placeholder="+880 1234-567890"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#ff6e18]" />
                      Street Address *
                    </Label>
                    <Input
                      placeholder="123 Main Street, Apartment 4B"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="mb-2 block">City *</Label>
                      <Input
                        placeholder="Dhaka"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Zip Code</Label>
                      <Input
                        placeholder="1200"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Country</Label>
                      <Input
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                        className="rounded-xl border-2 border-gray-200 focus:border-[#ff6e18]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-6">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold text-white">Order Items ({cart.length})</h2>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  {cart.map((item) => {
                    const discountedPrice = calculateDiscountedPrice(item.price, item.discount || 0);
                    return (
                      <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                        <Image
                          width={80}
                          height={80}
                          src={item.imageUrl || '/placeholder.png'}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <button
                              onClick={() => handleRemove(item._id!)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            {item.discount > 0 ? (
                              <>
                                <span className="text-lg font-bold text-[#ff6e18]">
                                  ৳{discountedPrice.toFixed(2)}
                                </span>
                                <del className="text-sm text-gray-400">৳{item.price.toFixed(2)}</del>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                ৳{item.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item._id!, -1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg hover:border-[#ff6e18] transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id!, 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg hover:border-[#ff6e18] transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {item.requiredPrescription && (
                            <div className="mt-3">
                              <Label className="text-sm font-semibold text-[#ff6e18] mb-2 block">
                                Prescription Required
                              </Label>
                              <Input
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePrescriptionUpload(item._id!, file);
                                }}
                                className="text-sm"
                              />
                              {item.prescription && (
                                <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Prescription uploaded
                                </p>
                              )}
                              {!item.prescription && (
                                <p className="mt-2 text-xs text-red-600">
                                  Please upload prescription to proceed
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-24"
            >
              <Card className="rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] p-6">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({payableItems.length} items)</span>
                      <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (5%)</span>
                      <span className="font-semibold">৳{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery</span>
                      <span className="font-semibold">৳{deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] bg-clip-text text-transparent">
                      ৳{total.toFixed(2)}
                    </span>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-3 block font-bold text-gray-900">
                      Delivery Option
                    </Label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setDeliveryOption('standard')}
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          deliveryOption === 'standard'
                            ? 'border-[#ff6e18] bg-[#ff6e18]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Standard Delivery</p>
                            <p className="text-sm text-gray-600">3-5 business days</p>
                          </div>
                          <span className="font-bold text-[#ff6e18]">৳3.00</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setDeliveryOption('express')}
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          deliveryOption === 'express'
                            ? 'border-[#ff6e18] bg-[#ff6e18]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Express Delivery</p>
                            <p className="text-sm text-gray-600">1-2 business days</p>
                          </div>
                          <span className="font-bold text-[#ff6e18]">৳6.00</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {session?.user?.role !== 'admin' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Place Order'}
                    </motion.button>
                  )}

                  <p className="text-xs text-gray-500 text-center">
                    By placing this order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CheckoutPage;
