# TestingSpace

A modern Next.js application integrated with Supabase for authentication and data management.

## 🚀 Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: JavaScript
*   **Authentication & Database**: [Supabase](https://supabase.com/)
*   **Styling**: Vanilla CSS / CSS Modules

## 📂 Project Structure

```
├── app/                  # App Router pages (Home, Login, Dashboard, etc.)
├── components/           # Reusable UI components (Navbar, Loader, etc.)
├── services/             # API services and mock data
├── utils/                # Utilities and Supabase client configuration
├── public/               # Static assets
└── styles/               # Global styles
```

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd testingspace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Key Features

*   **Authentication**: Secure Sign Up and Login using Supabase Auth.
*   **Protected Routes**: Middleware integration to protect dashboard and test routes.
*   **Responsive Design**: Mobile-friendly layout and components.
