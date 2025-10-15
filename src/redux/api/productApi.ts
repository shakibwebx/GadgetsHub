import { GetAllProductsParams, IProduct } from '@/types';
import baseApi from './baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all Products
    getAllProduct: builder.query({
      query: (params: GetAllProductsParams | string = {}) => {
        if (typeof params === 'string') {
          return params ? `/products?searchTerm=${params}` : '/products';
        }

        const queryParams = new URLSearchParams();

        // query parameters based on filter
        if (params.searchTerm) {
          queryParams.append('searchTerm', params.searchTerm);
        }
        if (params.tags && params.tags.length > 0) {
          queryParams.append('tags', params.tags.join(','));
        }
        if (params.symptoms && params.symptoms.length > 0) {
          queryParams.append('symptoms', params.symptoms.join(','));
        }
        if (params.inStock !== undefined) {
          queryParams.append('inStock', params.inStock.toString());
        }
        if (params.requiredPrescription !== undefined) {
          queryParams.append(
            'requiredPrescription',
            params.requiredPrescription.toString()
          );
        }
        if (params.minPrice !== undefined) {
          queryParams.append('minPrice', params.minPrice.toString());
        }
        if (params.maxPrice !== undefined) {
          queryParams.append('maxPrice', params.maxPrice.toString());
        }
        if (params.type) {
          queryParams.append('type', params.type);
        }
        if (params.categories && params.categories.length > 0) {
          queryParams.append('categories', params.categories.join(','));
        }

        // sorting
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        // pagination
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        const queryString = queryParams.toString();
        return queryString ? `/products?${queryString}` : '/products';
      },
      providesTags: ['Product'],
    }),
    // get single Product
    getSingleProduct: builder.query({
      query: (ProductId?: string) => `/products/${ProductId}`,
    }),
    // add Product
    addProduct: builder.mutation<IProduct, FormData>({
      query: (data) => ({
        url: '/products/create-product',
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['Product'],
    }),
    // update Product
    updateProduct: builder.mutation<IProduct, { id: string; data: FormData }>(
      {
        query: ({ id, data }) => ({
          url: `/products/${id}`,
          method: 'PATCH',
          body: data,
          formData: true,
        }),
        invalidatesTags: ['Product'],
      }
    ),
    // delete Product
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
