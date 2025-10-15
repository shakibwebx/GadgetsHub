'use client';
import { Button } from '../ui/button';
import { PlusCircle, Package, AlertTriangle, TrendingUp, Boxes } from 'lucide-react';
import Link from 'next/link';
import ProductsTable from './MedicineTable';
import { useGetAllProductQuery } from '@/redux/api/productApi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { IMedicine } from '@/types';

function Products() {
  const { data } = useGetAllProductQuery({ page: 1, limit: 1000 });
  const products: IMedicine[] = data?.data?.data || [];

  // Calculate statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.quantity < 10).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Low Stock',
      value: lowStockProducts,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Out of Stock',
      value: outOfStock,
      icon: Boxes,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total Value',
      value: `৳${totalValue.toFixed(0)}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="w-full py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-500 mt-1">Manage your gadgets inventory</p>
        </div>
        <Button asChild className="bg-[#ff6e18] hover:bg-[#e65c10]">
          <Link href="/admin/products/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Products Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <ProductsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default Products;
