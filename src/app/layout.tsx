// app/layout.tsx
import './globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import ReduxProvider from '@/redux/ReduxProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Gadgets-Hub',
  description: 'Gadgets-Hub - Your one-stop shop for all gadgets and electronics',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning className={poppins.className}>
        <ReduxProvider>
          <Providers>{children}</Providers>
          <Toaster position="bottom-right" richColors expand={false} />
        </ReduxProvider>
      </body>
    </html>
  );
}
