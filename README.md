# 🛒 Gadgets Hub – E-Commerce Store (Client)

**Live Site:** [https://gadgets-hub-topaz.vercel.app/](https://gadgets-hub-topaz.vercel.app/)

Gadgets Hub is a modern, full-featured e-commerce web application for tech products and gadgets. Built with **Next.js 15**, **TypeScript**, and **TailwindCSS**, it offers a seamless shopping experience with advanced filtering, cart management, secure payments, and comprehensive admin dashboard.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + Shadcn/UI
- **State Management:** Redux Toolkit + RTK Query
- **Authentication:** NextAuth.js (Google, GitHub)
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form
- **Image Upload:** ImgBB API
- **Charts:** Recharts
- **Notifications:** Sonner

### Backend Integration
- **API:** RESTful API with RTK Query
- **Payment:** SSLCommerz
- **File Upload:** Multer (server-side)

---

## 📦 Key Features

### 🛍️ Shopping Experience
- ✅ Dynamic product catalog with infinite scroll
- ✅ Advanced filtering (price, category, type, stock, tags, symptoms)
- ✅ Real-time search with debouncing
- ✅ Grid and list view modes
- ✅ Product quick view and detailed pages
- ✅ Related products suggestions
- ✅ Deal of the day with countdown timer
- ✅ Featured products section

### 🛒 Cart & Checkout
- ✅ Persistent cart with Redux
- ✅ Quantity management
- ✅ Prescription upload for required products
- ✅ Multiple delivery options (Standard/Express)
- ✅ Real-time price calculation with discounts
- ✅ Shipping information form
- ✅ SSLCommerz payment integration

### 🔐 Authentication & Authorization
- ✅ Social login (Google, GitHub) via NextAuth
- ✅ Email/password authentication
- ✅ JWT token management
- ✅ Role-based access control (Admin/User)
- ✅ Protected routes and API calls

### 👨‍💼 Admin Dashboard
- ✅ Comprehensive statistics dashboard
- ✅ Revenue and order trend charts
- ✅ Product management (CRUD operations)
- ✅ Order management with status updates
- ✅ Stock level monitoring
- ✅ Low stock alerts
- ✅ Two-column product edit interface
- ✅ Image upload with preview

### 🎨 UI/UX
- ✅ Fully responsive design (mobile-first)
- ✅ Modern gradient designs
- ✅ Smooth page transitions
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Animated cards and components

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Running backend server (see server README)

### 1. Clone the repository

```bash
git clone https://github.com/shakibwebx/GadgetsHub.git
cd GadgetsHub/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory. Use `.env.example` as a template:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# ImgBB API (for image uploads)
NEXT_PUBLIC_IMAGEBB_KEY=your_imgbb_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Auth pages (login, register)
│   │   ├── admin/               # Admin dashboard pages
│   │   ├── cart/                # Cart & checkout pages
│   │   ├── shop/                # Shop listing & product details
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── orders/              # User orders page
│   │   └── layout.tsx           # Root layout
│   ├── components/
│   │   ├── DefaultLayout/       # Main layout wrapper
│   │   ├── Home/                # Homepage components
│   │   ├── Products/            # Product management components
│   │   ├── Medicine/            # Product cards & details
│   │   ├── Filter/              # Filter sidebar
│   │   └── ui/                  # Shadcn UI components
│   ├── redux/
│   │   ├── features/            # Redux slices
│   │   │   ├── cart/           # Cart slice
│   │   │   ├── productSlice    # Product filters
│   │   │   └── orders/         # Orders slice
│   │   ├── api/                # RTK Query APIs
│   │   └── store.ts            # Redux store
│   ├── types/                   # TypeScript types
│   ├── utils/                   # Utility functions & auth options
│   └── lib/                     # Utility libraries
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md
```

---

## 🌐 Pages & Routes

### Public Routes
- `/` - Homepage with featured products
- `/shop` - Product catalog with filters
- `/shop/[id]` - Product details
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (User)
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/cart/payment` - Payment success page
- `/orders` - Order history

### Protected Routes (Admin)
- `/admin` - Dashboard with analytics
- `/admin/products` - Product list
- `/admin/products/add` - Add new product
- `/admin/products/edit/[id]` - Edit product
- `/admin/orders` - Order management

---

## 🔌 API Integration

The client uses **RTK Query** for all API calls:

### Product API (`productApi.ts`)
- `useGetAllProductQuery` - Fetch products with filters
- `useGetSingleProductQuery` - Fetch single product
- `useCreateProductMutation` - Create product (Admin)
- `useUpdateProductMutation` - Update product (Admin)
- `useDeleteProductMutation` - Delete product (Admin)

### Order API (`orderApi.ts`)
- `useGetAllOrderQuery` - Fetch orders
- `useGetSingleOrderQuery` - Fetch single order

### Payment API (`paymentSlice.ts`)
- `useCreateOrderMutation` - Initialize payment & create order

---

## 🎨 UI Components

Built with **Shadcn/UI** and customized for the project:

- Buttons, Cards, Inputs, Labels
- Dialogs, Drawers, Dropdowns
- Tabs, Separators, Badges
- Skeletons for loading states
- Custom toast notifications with Sonner

---

## 🔐 Authentication Flow

1. User clicks "Login with Google/GitHub"
2. NextAuth handles OAuth flow
3. Backend creates/retrieves user via `/api/auth/social-login`
4. JWT token stored in session
5. Token sent with all authenticated API requests

---

## 🧪 Testing

```bash
# Run tests (if configured)
npm test
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Environment Variables in Production

Make sure to set all environment variables in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL` → Production API URL
- `NEXTAUTH_URL` → Production frontend URL
- `NEXTAUTH_SECRET` → Generate secure secret
- OAuth credentials (Google, GitHub)
- `NEXT_PUBLIC_IMAGEBB_KEY` → ImgBB API key

---

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | Yes |
| `NEXTAUTH_URL` | Frontend URL for NextAuth | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes (for Google login) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes (for Google login) |
| `GITHUB_ID` | GitHub OAuth client ID | Yes (for GitHub login) |
| `GITHUB_SECRET` | GitHub OAuth client secret | Yes (for GitHub login) |
| `NEXT_PUBLIC_IMAGEBB_KEY` | ImgBB API key for image uploads | Yes |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shakib**
- GitHub: [@shakibwebx](https://github.com/shakibwebx)

---

## 🔗 Related

- [Server Repository](https://github.com/shakibwebx/GadgetsHub-Server)
- [Live Demo](https://gadgets-hub-topaz.vercel.app/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
