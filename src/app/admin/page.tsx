'use client';

import { useGetAllOrderQuery } from '@/redux/features/orders/orderApi';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  PackageCheck,
  ClipboardList,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Package,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Spinner from '@/components/shared/Spinner';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const { data: orderResponse = [], isLoading: ordersLoading } =
    useGetAllOrderQuery({});
  const { data: productsResponse, isLoading: productsLoading } =
    useGetAllProductQuery({ page: 1, limit: 100 });

  const orderData = orderResponse?.data;
  const productsData = productsResponse?.data?.data || [];

  const [stockData, setStockData] = useState({
    totalStock: 0,
    lowStockItems: 0,
  });

  // Calculate total revenue
  const totalRevenue =
    orderData?.reduce(
      (sum: number, order: { totalPrice?: number }) =>
        sum + (order.totalPrice || 0),
      0
    ) || 0;

  // Calculate order status breakdown
  const ordersByStatus =
    orderData?.reduce(
      (
        acc: Record<string, number>,
        order: { status?: string }
      ): Record<string, number> => {
        const status = order.status || 'Pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  // Prepare chart data for order status
  const statusChartData = Object.entries(ordersByStatus).map(
    ([status, count]) => ({
      name: status,
      value: count as number,
    })
  );

  // Prepare monthly revenue data (mock data for demo)
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4000, orders: 24 },
    { month: 'Feb', revenue: 3000, orders: 18 },
    { month: 'Mar', revenue: 5000, orders: 30 },
    { month: 'Apr', revenue: 7000, orders: 42 },
    { month: 'May', revenue: 6000, orders: 36 },
    { month: 'Jun', revenue: 8000, orders: 48 },
  ];

  // Product category breakdown
  const categoryData =
    productsData.reduce(
      (acc: Record<string, number>, product: { categories?: string[] }) => {
        product.categories?.forEach((cat: string) => {
          acc[cat] = (acc[cat] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const categoryChartData = Object.entries(categoryData).map(
    ([name, value]) => ({
      name,
      value: value as number,
    })
  );

  const COLORS = ['#ff6e18', '#1E1216', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  // Fetch stock data
  const fetchStockData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stocks`
      );
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (ordersLoading || productsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E1216]">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="border-l-4 border-l-[#ff6e18]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-[#ff6e18]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#1E1216]">
              ৳{totalRevenue.toFixed(2)}
            </div>
            <p className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              12% from last month
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#1E1216]">
              {orderData?.length || 0}
            </div>
            <p className="text-xs text-gray-500">
              {ordersByStatus['Pending'] || 0} pending orders
            </p>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Products
            </CardTitle>
            <Package className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#1E1216]">
              {productsData.length}
            </div>
            <p className="text-xs text-gray-500">
              {stockData.lowStockItems} low stock items
            </p>
          </CardContent>
        </Card>

        {/* Stock Levels */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Stock Levels
            </CardTitle>
            <PackageCheck className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#1E1216]">
              {stockData.totalStock}
            </div>
            <p className="text-xs text-gray-500">Total items in stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1E1216]">
              <TrendingUp className="h-5 w-5 text-[#ff6e18]" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff6e18"
                  fill="#ff6e18"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1E1216]">
              <ClipboardList className="h-5 w-5 text-blue-500" />
              Orders Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1E1216]">
              <BarChart3 className="h-5 w-5 text-[#ff6e18]" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1E1216]">
              <Package className="h-5 w-5 text-green-500" />
              Product Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#1E1216]">
            <ClipboardList className="h-5 w-5 text-[#ff6e18]" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.slice(0, 5).map((order: {
                  _id: string;
                  user?: { name?: string };
                  status?: string;
                  totalPrice: number;
                  createdAt: string;
                }) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">
                      {order._id.slice(-8)}
                    </td>
                    <td className="p-3">{order.user?.name || 'N/A'}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">
                      ৳{order.totalPrice.toFixed(2)}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
