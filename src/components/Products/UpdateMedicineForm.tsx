'use client';

import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
} from '@/redux/api/productApi';
import type { IMedicine, MedicineCategory, MedicineType } from '@/types';
import type React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Loader2, ArrowLeft, Upload, X, Package, DollarSign, Tag, Info } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

const UpdateMedicineForm = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // fetch Product
  const {
    data: singleProductData,
    isLoading: isLoadingProduct,
    isError,
    error,
  } = useGetSingleProductQuery(id);
  const singleProduct: IMedicine = singleProductData?.data;

  // update
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductMutation();

  // form state
  const [formData, setFormData] = useState<IMedicine>({
    name: '',
    description: '',
    price: 0,
    quantity: 1,
    prescriptionFile: null,
    requiredPrescription: false,
    manufacturer: '',
    expiryDate: new Date(),
    type: 'Smartwatch',
    categories: [],
    symptoms: [],
    discount: 0,
    imageUrl: '',
    supplier: '',
    inStock: true,
    sku: '',
    tags: [],
    isDeleted: false,
  });

  // file input
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Mount state to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // populate form when data is loaded
  useEffect(() => {
    if (singleProduct) {
      const expiryDate = singleProduct.expiryDate
        ? new Date(singleProduct.expiryDate)
        : new Date();

      setFormData({
        ...singleProduct,
        expiryDate,
        // Ensure type has a valid value
        type: singleProduct.type || 'Smartwatch',
        // Ensure arrays are not undefined
        categories: singleProduct.categories || [],
        symptoms: singleProduct.symptoms || [],
        tags: singleProduct.tags || [],
      });

      // set preview URL from existing image if available
      if (singleProduct.imageUrl) {
        setPreviewUrl(singleProduct.imageUrl);
      }
    }
  }, [singleProduct]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // image file handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setPreviewUrl(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(formData.imageUrl || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error('No Product ID found');
      return;
    }

    // Validate required fields
    if (!formData.type || formData.type === '') {
      toast.error('Product type is required');
      return;
    }

    try {
      // create FormData object to send file
      const ProductData = new FormData();

      // add all text fields
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof IMedicine;

        const value = formData[typedKey];

        if (typedKey !== 'imageUrl' && value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            value.forEach((item: string) => {
              ProductData.append(`${typedKey}[]`, item);
            });
          } else if (typedKey === 'expiryDate' && value instanceof Date) {
            ProductData.append(typedKey, value.toISOString());
          } else {
            ProductData.append(typedKey, String(value));
          }
        }
      });

      // add image file if exists
      if (selectedImage) {
        ProductData.append('image', selectedImage);
      }

      const response = await updateProduct({
        id,
        data: ProductData,
      }).unwrap();
      console.log('Success:', response);
      toast.success('Product updated successfully!');

      // navigate back after successful update
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } catch (error: unknown) {
      console.error('Error:', error);

      let message = 'Unknown error';

      if (typeof error === 'object' && error !== null) {
        const maybeErr = error as {
          data?: { errorSources?: { message?: string }[] };
          message?: string;
        };

        message =
          maybeErr.data?.errorSources?.[0]?.message ||
          maybeErr.message ||
          message;
      }

      toast.error(`Error updating product: ${message}`);
    }
  };

  // loading or not mounted
  if (!mounted || isLoadingProduct) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="text-primary h-12 w-12 animate-spin mx-auto" />
          <p className="text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  type CustomError = {
    data?: {
      message?: string;
    };
  };

  if (isError) {
    const customError = error as CustomError;

    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <h2 className="text-xl font-bold text-red-500">
              Error Loading Product
            </h2>
            <p>
              {customError?.data?.message || 'Failed to load product data'}
            </p>
            <Button onClick={() => router.push('/admin/products')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const discountedPrice = useMemo(() => {
    return formData.price - (formData.price * formData.discount / 100);
  }, [formData.price, formData.discount]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push('/admin/products')}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-500 mt-1">Update product information</p>
        </div>
        {formData.discount > 0 && (
          <Badge className="bg-red-500 text-lg px-4 py-2">
            {formData.discount}% OFF
          </Badge>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image Upload */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Product Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {previewUrl ? (
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={previewUrl}
                    alt="Product Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <div className="text-center p-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No image uploaded</p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="image" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ff6e18] hover:bg-orange-50 transition">
                    <Upload className="h-4 w-4" />
                    <span>Choose New Image</span>
                  </div>
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Price Preview */}
              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Original Price:</span>
                    <span className={formData.discount > 0 ? "line-through text-gray-400" : "font-semibold text-lg"}>
                      ৳{formData.price.toFixed(2)}
                    </span>
                  </div>
                  {formData.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Discounted Price:</span>
                      <span className="font-bold text-xl text-[#ff6e18]">
                        ৳{discountedPrice.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Status */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Stock Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available:</span>
                <Badge className={formData.quantity > 10 ? "bg-green-500" : formData.quantity > 0 ? "bg-orange-500" : "bg-red-500"}>
                  {formData.quantity} units
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant={formData.inStock ? "default" : "destructive"}>
                  {formData.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Apple Watch Series 9"
                    required
                    className="text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer *</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="Apple Inc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Product Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as MedicineType })
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Smartwatch">Smartwatch</SelectItem>
                      <SelectItem value="Smartphone">Smartphone</SelectItem>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="PC">PC</SelectItem>
                      <SelectItem value="Airbuds">Airbuds</SelectItem>
                      <SelectItem value="Camera">Camera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="WATCH-001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    name="supplier"
                    value={formData.supplier || ''}
                    onChange={handleChange}
                    placeholder="Tech Supplies Ltd"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of the product..."
                    className="min-h-24"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (৳) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="4999.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="1"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>In Stock</Label>
                  <Select
                    value={formData.inStock ? 'yes' : 'no'}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        inStock: value === 'yes',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Prescription Required</Label>
                  <Select
                    value={formData.requiredPrescription ? 'yes' : 'no'}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        requiredPrescription: value === 'yes',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate?.toISOString().split('T')[0] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: new Date(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories & Tags */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categories & Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <select
                    multiple
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categories: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value as MedicineCategory
                        ),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 min-h-[100px] focus:ring-2 focus:ring-[#ff6e18] focus:outline-none"
                  >
                    {[
                      'Watch',
                      'Phone',
                      'Macbook',
                      'Computer',
                      'Headphones',
                      'DSLR',
                      'mouse',
                      'keyboard',
                      'monitor',
                    ].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value.split(',').map((tag) => tag.trim()),
                      })
                    }
                    placeholder="wireless, bluetooth, water-resistant"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Features (comma-separated)</Label>
                  <Input
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms?.join(', ') || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        symptoms: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    placeholder="heart rate monitor, GPS, waterproof"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#ff6e18] hover:bg-[#e65c10] min-w-[200px]"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Product...
                </>
              ) : (
                'Update Product'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMedicineForm;
