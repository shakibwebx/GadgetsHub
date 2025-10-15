'use client';

import { Edit, Eye, Trash2, Search, Filter, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import { IMedicine } from '@/types';
import Image from 'next/image';
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from '@/redux/api/productApi';
import { useState, useMemo, useEffect } from 'react';

export default function ProductsTable() {
  const { data, isLoading } = useGetAllProductQuery({ page: 1, limit: 100 });
  const [deleteMedicine] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const products = data?.data?.data || [];

  // Get unique categories and types
  const categories = useMemo(() => {
    if (!mounted) return ['all'];
    return ['all', ...new Set(products.map((p: IMedicine) => p.category))];
  }, [products, mounted]);

  const types = useMemo(() => {
    if (!mounted) return ['all'];
    return ['all', ...new Set(products.map((p: IMedicine) => p.type))];
  }, [products, mounted]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!mounted) return products;
    return products.filter((product: IMedicine) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesType = typeFilter === 'all' || product.type === typeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [products, searchTerm, categoryFilter, typeFilter, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // if No products founds
  if (products.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="mb-4">
          No products found. Add your first gadget product.
        </p>
        <Button asChild>
          <Link href="/admin/products/add">Add Product</Link>
        </Button>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMedicine(id).unwrap();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Failed to delete product:', error);
    }
  };

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (quantity < 10) {
      return <Badge className="bg-orange-500">Low Stock</Badge>;
    } else {
      return <Badge className="bg-green-500">In Stock</Badge>;
    }
  };

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Category: {categoryFilter === 'all' ? 'All' : categoryFilter}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Type: {typeFilter === 'all' ? 'All' : typeFilter}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {types.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => setTypeFilter(type)}
              >
                {type === 'all' ? 'All Types' : type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {filteredProducts?.map((product: IMedicine) => (
          <Card key={`mobile-${product._id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {product.manufacturer}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStockBadge(product.quantity)}
                    {product.discount > 0 && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-semibold text-gray-900">৳{product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="font-semibold text-gray-900">{product.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm text-gray-700 capitalize">{product.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm text-gray-700 capitalize">{product.type}</p>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2 p-4">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/shop/${product._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/admin/products/edit/${product._id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{product.name}&quot;?
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts?.map((product: IMedicine) => (
              <TableRow key={product._id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={product.imageUrl || '/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    {product.discount > 0 && (
                      <Badge variant="outline" className="mt-1 bg-red-50 text-red-600 border-red-200">
                        -{product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{product.manufacturer}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">৳{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={product.quantity < 10 ? 'text-orange-600 font-semibold' : ''}>
                    {product.quantity}
                  </span>
                </TableCell>
                <TableCell>{getStockBadge(product.quantity)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/shop/${product._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{product.name}&quot;?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setTypeFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
}
