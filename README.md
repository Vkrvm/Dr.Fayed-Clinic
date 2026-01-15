# Haraka Physical Therapy Center - Medical Portfolio

A high-performance, accessible, and multilingual (English & Arabic) web platform for **Haraka Physical Therapy Center**. Built with the latest web technologies to ensure speed, SEO optimization, and a seamless user experience.

## ✨ Features

- **Multilingual Support**: Fully localized in English (`en`) and Arabic (`ar`) with RTL support.
- **Dynamic Content**: Services, testimonials, and team members managed via database.
- **Appointment Booking**: Integrated booking system for patients.
- **Admin Dashboard**: Secure dashboard to manage content, bookings, invoices and patient records.
- **Responsive Design**: Mobile-first approach using Bootstrap 5 and custom SCSS.
- **SEO Optimized**: Server-Side Rendering (SSR) and dynamic metadata for better search visibility.
- **Modern Animations**: smooth transitions and interactions using Framer Motion.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** SCSS Modules + Bootstrap 5
- **Database:** Prisma ORM with PostgreSQL (Supabase)
- **Authentication:** Auth.js (NextAuth v5)
- **State/Forms:** React Hook Form + Zod validation
- **Icons:** FontAwesome & Lucide React
- **Deployment:** Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Vkrvm/Haraka-Physical-Therapy-Center.git
    cd Haraka-Physical-Therapy-Center
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and configure your credentials:
    ```env
    DATABASE_URL="postgresql://..."
    DIRECT_URL="postgresql://..."
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    AUTH_SECRET="your_secret_key"
    ```

4.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

```bash
src/
├── app/            # App Router pages (SSR/Client components)
│   ├── [locale]/   # Localized routes (en/ar)
│   ├── api/        # API Routes
│   └── favicon.ico
├── components/     # Reusable UI components
├── lib/            # Utilities (Prisma, AuthUtils, etc.)
├── messages/       # Translations (en.json, ar.json)
├── styles/         # Global SCSS, Variables, Mixins
└── middleware.ts   # Internationalization & Auth middleware
```

## 🌐 Internationalization

The project uses `next-intl` for routing and translations.
- **URL Structure**: `example.com/en` | `example.com/ar`
- **Detection**: Automatically detects user preference or falls back to default.
- **RTL**: Automatically applies `dir="rtl"` for Arabic locales.

## 📄 License

This project is proprietary and intended for internal use by **Haraka Physical Therapy Center**.
