'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/shared/Spinner';

export default function ProfilePage() {
  interface User {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string;
    phone?: string;
    address?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/email/${session.user.email}`
        );
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      setError('You are not logged in.');
      setLoading(false);
    }
  }, [session, status]);

  const handleUpdateProfile = () => {
    if (!user?._id) {
      alert('User ID could not be found.');
      return;
    }
    router.push(`/profile/${user._id}/edit`);
  };

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <Image
              src={
                user?.image ||
                'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
              }
              width={120}
              height={120}
              alt="User Image"
              className="rounded-full border-4 border-[#ff6e18] object-cover"
            />
          </div>

          {/* User Info */}
          <div className="space-y-3 text-left">
            <div className="border-b pb-2">
              <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{user?.role || 'User'}</p>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                <p className="text-sm text-gray-800">{user?.email}</p>
              </div>

              {user?.phone && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                  <p className="text-sm text-gray-800">{user.phone}</p>
                </div>
              )}

              {user?.address && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                  <p className="text-sm text-gray-800">{user.address}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">User ID</p>
                <p className="text-xs text-gray-600 font-mono">{user?._id || 'Not found'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleUpdateProfile}
              className="flex-1 bg-[#ff6e18] hover:bg-[#ff6e18]/90"
            >
              Update Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="flex-1"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
