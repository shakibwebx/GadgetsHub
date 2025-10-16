'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/shared/Spinner';
import { Eye, EyeOff } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function EditProfilePage() {
  const params = useParams();
  const { update } = useSession();
  const [user, setUser] = useState({ _id: '', name: '', email: '', phone: '', address: '', image: '' });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${params.id}`);
        setUser(res.data);
      } catch (err) {
        console.error('User load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords if user is trying to update password
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', user.name);
    if (user.phone) formData.append('phone', user.phone);
    if (user.address) formData.append('address', user.address);

    // Only append password if user wants to update it
    if (password) {
      formData.append('password', password);
    }

    if (profilePicFile) {
      formData.append('image', profilePicFile);
    }

    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update NextAuth session with new user data
      if (response.data) {
        await update({
          name: response.data.name,
          email: response.data.email,
          image: response.data.image,
          role: response.data.role,
        });
      }

      toast.success('Profile Updated Successfully');
      router.push('/profile');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Profile Update Failed');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle image file change with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicFile(file);

      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setPreviewUrl(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  if (loading)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Update Profile
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Update your profile information
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Profile Picture Section */}
            <div className="space-y-3">
              <Label htmlFor="profilePic">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src={previewUrl || user.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover border-2 border-gray-200"
                    unoptimized
                  />
                </div>
                <Input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email (Disabled) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email (Cannot be changed)</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                placeholder="Enter your address"
              />
            </div>

            {/* Password Section */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-700">
                Change Password (Optional)
              </h3>

              {/* New Password */}
              <div className="space-y-2 mb-3">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password (min 6 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/profile')}
                className="flex-1"
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#ff6e18] hover:bg-[#ff6e18]/90"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
