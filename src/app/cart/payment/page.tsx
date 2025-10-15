'use client';

import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useVerifyOrderQuery } from '@/redux/features/payment/paymentSlice';
import { toast } from 'sonner';

const PaymentContent = () => {
  const searchParams = useSearchParams();

  // Log all URL parameters for debugging
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    console.log('Payment Page URL Params:', params);
    console.log('All available params:', searchParams.toString());
  }, [searchParams]);

  // SSLCommerz sends tran_id as the order ID
  const orderId = searchParams.get('tran_id') || searchParams.get('order_id') || searchParams.get('val_id');
  const status = searchParams.get('status');

  // Use the verify order query only if orderId exists
  const {
    data: verifyData,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyOrderQuery(orderId || undefined, {
    skip: !orderId,
  });

  useEffect(() => {
    if (isVerifyError && orderId) {
      toast.error('Payment verification failed');
      console.error('Verify Error:', verifyError);
    }
  }, [isVerifySuccess, isVerifyError, verifyData, verifyError, orderId]);

  const paymentStatus = verifyData?.data?.[0]?.bank_status || status;

  // If no order_id, show error immediately without making API call
  if (!orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-gray-50 to-white px-4">
        <div className="w-full max-w-xl text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h1 className="mb-2 text-3xl font-semibold text-gray-800">
            No Payment Information
          </h1>
          <p className="mb-6 text-gray-600">
            No payment information found. This page is used to show payment results after checkout.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => (window.location.href = '/shop')}>
              Go to Shop
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = '/cart')}>
              View Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isVerifySuccess && orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center text-gray-600">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#ff6e18]"></div>
          <p className="text-lg font-semibold">Verifying payment...</p>
        </div>
      </div>
    );
  }

  const {
    order_id,
    name,
    amount,
    currency,
    method,
    date_time,
    card_holder_name,
    card_number,
    phone_no,
    bank_trx_id,
    sp_message,
  } = verifyData?.data?.[0] || {};

  const renderStatusContent = () => {
    switch (paymentStatus) {
      case 'Success':
        return (
          <>
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="mb-2 text-3xl font-semibold text-gray-800">
              Payment Successful!
            </h1>
            <p className="mb-6 text-gray-600">
              Thank you, {name || 'Customer'}. Your payment has been confirmed.
            </p>
          </>
        );
      case 'Failed':
        return (
          <>
            <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
            <h1 className="mb-2 text-3xl font-semibold text-gray-800">
              Payment Failed
            </h1>
            <p className="mb-6 text-gray-600">
              Unfortunately, your payment could not be processed. Please try again.
            </p>
          </>
        );
      case 'Cancel':
        return (
          <>
            <RefreshCcw className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
            <h1 className="mb-2 text-3xl font-semibold text-gray-800">
              Payment Cancelled
            </h1>
            <p className="mb-6 text-gray-600">
              Your payment has been cancelled. If this was a mistake, please try again.
            </p>
          </>
        );
      default:
        return (
          <>
            <p className="mb-6 text-gray-600">
              We are unable to verify your payment status at the moment.
            </p>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-green-50 to-white px-4">
      <div className="w-full max-w-xl text-center">
        {renderStatusContent()}

        <Card className="text-left shadow-md">
          <CardContent className="space-y-3 p-6">
            <div className="flex justify-between">
              <span className="font-medium">Order ID:</span>
              <span>{order_id || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span>{bank_trx_id || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>
                {amount || 'N/A'} {currency || 'BDT'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span>{method || 'N/A'}</span>
            </div>
            {card_holder_name && (
              <div className="flex justify-between">
                <span className="font-medium">Card Holder Name:</span>
                <span>{card_holder_name}</span>
              </div>
            )}
            {card_number && (
              <div className="flex justify-between">
                <span className="font-medium">Card Number:</span>
                <span>{card_number}</span>
              </div>
            )}
            {phone_no && (
              <div className="flex justify-between">
                <span className="font-medium">Phone Number:</span>
                <span>{phone_no}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium">Payment Status:</span>
              <span className={`font-semibold ${
                paymentStatus === 'Success' ? 'text-green-600' :
                paymentStatus === 'Failed' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {paymentStatus || 'Unknown'}
              </span>
            </div>
            {date_time && (
              <div className="flex justify-between">
                <span className="font-medium">Date & Time:</span>
                <span>{date_time}</span>
              </div>
            )}
            {paymentStatus === 'Failed' && sp_message && (
              <div className="flex justify-between">
                <span className="font-medium">Failure Reason:</span>
                <span>{sp_message}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={() => (window.location.href = '/orders')}>
            Track Orders
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/shop')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentResponsePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#ff6e18]"></div>
            <p className="text-lg font-semibold text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
};

export default PaymentResponsePage;
