// app/layout.tsx
import './globals.css';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { Providers } from './providers';
import ReduxProvider from '@/redux/ReduxProvider';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'MediSphere',
  description: 'Your trusted online medicine shop',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <Providers>{children}</Providers>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
