# Fayed Clinic - Medical Portfolio

A high-performance, accessible, and multilingual portfolio website for Dr. Fayed's Clinic, built with Next.js 16.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** SCSS + Bootstrap 5
- **Database:** Prisma ORM (PostgreSQL on Supabase)
- **Internationalization:** `next-intl` (English & Arabic)
- **Deployment:** Vercel (Recommended)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Vkrvm/Dr.Fayed-Clinic.git
    cd Dr.Fayed-Clinic
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Copy `.env.example` to `.env` (create if missing) and add your Supabase credentials:
    ```env
    DATABASE_URL="postgresql://postgres.[user]:[password]@..."
    DIRECT_URL="postgresql://postgres.[user]:[password]@..."
    ```

4.  Initialize the database:
    ```bash
    npx prisma generate
    ```

5.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

```
src/
├── app/            # App Router pages & layouts
│   └── [locale]/   # Localized routes (en/ar)
├── components/     # React components
├── i18n/           # Internationalization config
├── styles/         # Global SCSS & Bootstrap variables
├── lib/            # Utilities & database clients
└── messages/       # Translation files (JSON)
```

## 🌐 Internationalization

The project supports **English (en)** and **Arabic (ar)**.
- URL-based routing: `/en/...`, `/ar/...`
- RTL support is automatically handled in the root layout.
- Translation files are located in `src/messages/`.

## 🎨 Styling configuration

Bootstrap is configured via SCSS modules in `src/styles/globals.scss`.
- Custom variables: `src/styles/variables.scss`
- Bootstrap imports are managed explicitly to ensure compatibility with Next.js Turbopack.

## 📄 License

This project is proprietary and intended for the Fayed Clinic.
