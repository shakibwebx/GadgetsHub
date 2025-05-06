
'use client';

import { registerUser } from '@/actions/serverActions';
import { Eye, EyeClosed } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const router = useRouter();
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error('You must agree to the Terms & Conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!isPasswordValid(formData.password)) {
      toast.error(
        'Password must be at least 6 characters long and include one uppercase letter and one number.'
      );
      return;
    }

    try {
      await registerUser(formData);
      toast.success('Registration successful!');
      router.push('/login');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Registration failed. Try again.');
    }
  };
  async function handleSocialRegister(provider: string): Promise<void> {
    try {
      // Simulate social authentication logic
      toast.info(`Redirecting to ${provider} for authentication...`);
      // Example: Redirect to a social auth endpoint or handle OAuth flow
      // This is a placeholder for actual implementation
      setTimeout(() => {
        toast.success(`Successfully signed up with ${provider}!`);
        router.push('/dashboard'); // Redirect to dashboard or desired page
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Failed to sign up with ${provider}. Please try again.`);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg text-[#1E1216]">
        <h2 className="text-center text-2xl font-semibold">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'phone', 'address'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium">
                {field === 'name' ? 'Full Name' : field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                required
                value={String(formData[field as keyof typeof formData])}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2"
              />
            </div>
          ))}

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={togglePassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
              >
                {togglePassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters, with one uppercase letter and one number.
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={toggleConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
              >
                {toggleConfirmPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="rounded border-gray-300 text-[#ff6e18] focus:ring-[#ff6e18]"
              required
            />
            <span className="ml-2 text-sm">
              I agree to the{' '}
              <a href="#" className="text-[#ff6e18] hover:underline">
                Terms & Conditions
              </a>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#ff6e18] px-4 py-2 text-white hover:opacity-90"
          >
            Register
          </button>
        </form>

        {/* Social Register Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSocialRegister('GitHub')}
            className="flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
          >
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign Up with GitHub
          </button>
          <button
            onClick={() => handleSocialRegister('Google')}
            className="flex items-center justify-center rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-600"
          >
            <Image
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign Up with Google
          </button>
        </div>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-[#ff6e18] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
