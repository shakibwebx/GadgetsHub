import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';
// import { toast } from 'react-toastify';

// Get API base URL with fallback
const getBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const baseUrl = apiUrl ? `${apiUrl}/api` : 'http://localhost:5001/api';

  console.log('API Base URL:', baseUrl);

  // Validate URL
  try {
    new URL(baseUrl);
    return baseUrl;
  } catch (e) {
    console.error('Invalid API URL:', baseUrl, e);
    return 'http://localhost:5001/api';
  }
};

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: 'include',
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.accessToken;

      if (!token) {
        // toast.error('You are not logged in!');
      } else {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: () => ({}),
});
export default baseApi;
