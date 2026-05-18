# Next.js E-Commerce

A modern e-commerce web application built with Next.js 15, React 19, and TypeScript. It features product browsing, filtering, shopping cart management, and user authentication — powered by a mock API backend (DummyJSON).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, shadcn/ui, Radix UI |
| Forms | React Hook Form + Zod |
| Auth | NextAuth v5 (Credentials + JWT) |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Toasts | Sonner |
| Linting | ESLint, Prettier, Commitlint, Husky |

## Features

- Product listing with filtering (price range, category, brand) and sorting
- Product detail page with image carousel and reviews
- Shopping cart — add, remove, update quantity; persisted in session storage
- User authentication (email/password) with protected routes
- Order summary with discount and shipping fee calculations
- Breadcrumb navigation, loading skeletons, responsive design
- Dynamic SEO metadata (OpenGraph, Twitter cards)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # Route handlers (products, categories, auth)
│   ├── (auth)/             # Login & profile pages
│   ├── (shopping)/         # Shop listing & cart pages
│   └── page.tsx            # Home page
├── components/
│   ├── features/           # Feature-scoped components (home, auth, shopping)
│   ├── layout/             # Header, footer, breadcrumb
│   ├── common/             # Shared UI, form fields, skeletons
│   └── widgets/            # Cards, pagination
├── actions/                # Next.js Server Actions
├── hooks/                  # Custom React hooks (cart, session storage, etc.)
├── lib/                    # Auth config, schemas, utilities
├── utils/                  # API client, URL builder, formatters
├── constants/              # Routes, filter options, messages
└── types/                  # TypeScript interfaces
```

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd e-commerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# API
PORT=3000

# NextAuth — generate secret with: openssl rand -base64 32
AUTH_SECRET=your-secret-here
AUTH_TRUST_HOST=true

# Mock user credentials
USER_EMAIL=your-email@example.com
PASSWORD=your-password
```

## Running the App

**Development:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production:**

```bash
npm run build
npm start
```

**Other scripts:**

```bash
npm run lint    # Run ESLint
```

## Deployment

Live URL: https://e-commerce-alpha-rouge-97.vercel.app/

To log in on the deployed app, use the mock credentials:

```
Email:    emily.johnson@x.dummyjson.com
Password: emilyspass
```

## Notes

- This project uses [DummyJSON](https://dummyjson.com) as a mock API — no real database is required.
- Cart state is persisted in session storage (client-side only).
- Authentication uses a mock in-memory user with bcrypt-hashed password.
- Protected routes (`/cart`, `/profile`) redirect to `/login` if the user is unauthenticated.
- For full feature scope details, see the [project document](https://docs.google.com/document/d/1uNUnMoEJOx9iE-_uv1J9YdHK4H_inhXaYpGbxDP_D10/edit?usp=sharing).
