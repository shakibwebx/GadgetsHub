'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl,
    });

    if (res?.ok) {
      toast.success('Login successful!');
      setTimeout(() => {
        window.location.href = callbackUrl;
      }, 1500);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, {
      callbackUrl,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6">
        <h2 className="text-center text-3xl font-bold text-[#1E1216]">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500">
          Please log in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1E1216]">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6e18] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1E1216]">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={togglePassword ? 'text' : 'password'}
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6e18] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
              >
                {togglePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="rounded border-gray-300 text-[#ff6e18] focus:ring-[#ff6e18]"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#ff6e18] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff6e18] text-white py-2 rounded-lg hover:bg-[#e65c10] transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="space-y-2">
          <button
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
              width={20}
              height={20}
            />
            Login with GitHub
          </button>

          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <Image
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Login with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/register" className="text-[#ff6e18] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
