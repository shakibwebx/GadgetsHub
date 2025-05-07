import { GetAllMedicinesParams, IMedicine } from '@/types';
import baseApi from './baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all Medicines
    getAllMedicine: builder.query({
      query: (params: GetAllMedicinesParams | string = {}) => {
        if (typeof params === 'string') {
          return params ? `/medicines?searchTerm=${params}` : '/medicines';
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
        return queryString ? `/medicines?${queryString}` : '/medicines';
      },
      providesTags: ['Medicine'],
    }),
    // get single Medicine
    getSingleMedicine: builder.query({
      query: (MedicineId?: string) => `/medicines/${MedicineId}`,
    }),
    // add Medicine
    addMedicine: builder.mutation<IMedicine, FormData>({
      query: (data) => ({
        url: '/medicines/create-medicine',
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['Medicine'],
    }),
    // addMedicine: builder.mutation({
    //   query: (data?: IMedicine) => ({
    //     url: `/Medicines/create-Medicine`,
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: ['Medicine'],
    // }),
    // update Medicine
    updateMedicine: builder.mutation<IMedicine, { id: string; data: FormData }>(
      {
        query: ({ id, data }) => ({
          url: `/medicines/${id}`,
          method: 'PATCH',
          body: data,
          formData: true,
        }),
        invalidatesTags: ['Medicine'],
      }
    ),
    // updateMedicine: builder.mutation({
    //   query: ({ id, data }: { id: string; data: IMedicine }) => ({
    //     url: `/Medicines/${id}`,
    //     method: 'PATCH',
    //     body: data,
    //   }),
    //   invalidatesTags: ['Medicine'],
    // }),
    // delete Medicine
    deleteMedicine: builder.mutation({
      query: (id: string) => ({
        url: `/medicines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Medicine'],
    }),
  }),
});

export const {
  useGetAllMedicineQuery,
  useGetSingleMedicineQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = productApi;
