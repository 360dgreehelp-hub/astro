# Vidhira – Numerology & Astrology Fortune Reports

Vidhira is a spiritual MVP web app that blends Chaldean numerology and Vedic astrology to deliver personalised life blueprints for Nepali audiences. This project uses **React + TailwindCSS** on the frontend, **Supabase** for auth/data, optional **OpenAI** integration for AI-generated insights, and mock **Khalti** checkout flows.

## 🧱 Tech Stack

- React 18 + Vite + TypeScript
- TailwindCSS with Playfair Display & Inter fonts
- Supabase Auth (Google) & Database helpers
- TanStack Query for future data fetching needs
- Optional OpenAI GPT-4.1-mini for report generation
- html2pdf.js to export reports to PDF

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file from `.env.example` and fill in your Supabase & OpenAI credentials. When running locally without OpenAI, the app will show placeholder copy.

## 📦 Key Features

- Landing page with hero, benefits, and persona-driven pricing
- Onboarding flow capturing birth details & live numerology preview
- Numerology engine for Mulank, Bhagyank, and Chaldean name number
- GPT-powered report generator with PDF download support
- Supabase-authenticated dashboard & admin insights (mock tables)
- Khalti-style payment simulation per pricing tier

## 🛣️ Deployment

The app is Vercel/Netlify ready. Configure environment variables on the hosting platform and ensure Supabase OAuth redirect URLs include your deployed domain.

## 📄 License

This MVP is provided as-is for rapid prototyping of the Vidhira product vision.
