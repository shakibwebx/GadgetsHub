import baseApi from '@/redux/api/baseApi';

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: '/orders',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getOrders: builder.query({
      query: () => '/orders',
    }),
    verifyOrder: builder.query({
      query: (order_id) => {
        // Ensure we have a valid order_id
        const validOrderId = order_id && order_id !== '' ? order_id : null;

        return {
          url: '/orders/verify-public',
          params: validOrderId ? { order_id: validOrderId } : {},
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
} = paymentApi;
