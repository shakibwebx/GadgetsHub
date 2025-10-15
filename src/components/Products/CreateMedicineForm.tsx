'use client';

import { useAddProductMutation } from '@/redux/api/productApi';
import { IMedicine, MedicineCategory, MedicineType } from '@/types';
import React, { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

const CreateProductForm = () => {
  const navigate = useRouter();
  const [addMedicine, { isLoading }] = useAddProductMutation();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // create FormData object to send file
      const productData = new FormData();

      // add all text fields
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof IMedicine;

        const value = formData[typedKey];

        if (typedKey !== 'imageUrl' && value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((item: string) => {
              productData.append(`${typedKey}[]`, item);
            });
          } else if (typedKey === 'expiryDate' && value instanceof Date) {
            productData.append(typedKey, value.toISOString());
          } else {
            productData.append(typedKey, String(value));
          }
        }
      });

      // add image file if exists
      if (selectedImage) {
        productData.append('image', selectedImage);
      }

      const response = await addMedicine(productData).unwrap();
      console.log('Success:', response);
      toast.success('Product added successfully!');

      // reset form after successful submission
      setFormData({
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
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error: unknown) {
      console.error('Full Error:', error);
      console.error('Error type:', typeof error);

      let message = 'Unknown error';

      if (typeof error === 'object' && error !== null) {
        console.error('Error object:', JSON.stringify(error, null, 2));

        const maybeErr = error as {
          data?: {
            message?: string;
            errorSources?: { message?: string }[];
          };
          message?: string;
          status?: number;
        };

        message =
          maybeErr.data?.message ||
          maybeErr.data?.errorSources?.[0]?.message ||
          maybeErr.message ||
          message;

        console.error('Parsed message:', message);
        console.error('Status:', maybeErr.status);
      }

      toast.error(`Error adding product: ${message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Add New Product</h2>
      <div>
        <Button onClick={() => navigate.back()}>Back to Previous Page</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product 5000mm"
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Tech Inc."
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="499.99"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="10"
            required
            className="w-full"
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
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="PROD12345"
            className="w-full"
          />
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
            placeholder="electronics, gadget, mobile"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Product Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as MedicineType })
            }
          >
            <SelectTrigger id="type" className="w-full">
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
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: new Date(e.target.value) })
            }
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            name="supplier"
            value={formData.supplier || ''}
            onChange={handleChange}
            placeholder="Global Tech Supplier"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>In Stock</Label>
          <select
            name="inStock"
            value={formData.inStock ? 'yes' : 'no'}
            onChange={(e) =>
              setFormData({
                ...formData,
                inStock: e.target.value === 'yes',
              })
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="categories">Categories (multi)</Label>
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
          className="w-full rounded border px-3 py-2"
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
      </div>

      {/* Image preview */}
      {previewUrl && (
        <div className="space-y-2">
          <Label htmlFor="preview">Image Preview</Label>
          <div className="relative h-64 w-full overflow-hidden rounded-lg border">
            <Image
              src={previewUrl}
              alt="Product Preview"
              fill
              style={{ objectFit: 'contain' }}
              className="p-2"
            />
          </div>
        </div>
      )}

      <div className="space-y-2 md:col-span-2">
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
          placeholder="battery, fast-charging, waterproof"
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description of the product"
          className="min-h-24 w-full"
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="w-full bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 md:w-64"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Product...
            </>
          ) : (
            'Add Product'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateProductForm;
