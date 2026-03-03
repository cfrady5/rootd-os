# Rootd OS — NIL Management Platform

> "Rootd in Community. Driven by Athletes."

A compliance-first NIL management platform connecting college athletes, athletic directors, and business partners.

## Quick Start

```bash
npm install
./node_modules/.bin/vite        # Windows (npm scripts broken on Windows — use binary directly)
npm run dev                     # Mac/Linux
```

Runs at: http://localhost:5173

## Demo Mode

No backend required. If `.env` is absent (or Supabase keys not set), the app runs in full demo mode with mock data.

Demo user: `Ava Thompson · Women's Soccer · Stanford University`

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | React 18 + React Router v6        |
| Build      | Vite 5.4                          |
| Styling    | Tailwind CSS v3 + inline styles   |
| Animation  | Framer Motion v11                 |
| Icons      | Lucide React                      |
| Backend    | Supabase (optional)               |

## Portals

| Persona          | Route         |
|------------------|---------------|
| Student-Athlete  | /athlete/*    |
| Athletic Director| /director/*   |
| Business Partner | /dashboard/*  |

## Supabase Setup (Optional)

Copy `.env.example` → `.env` and fill in your Supabase project credentials.

## Project Structure

```
src/
├── context/          # AuthContext, ProfileContext
├── lib/
│   ├── api/          # API functions + mock data
│   ├── theme.js      # Design tokens
│   └── personaRoutes.js
├── components/
│   ├── shared/UI.jsx # 🎯 Single shared component library
│   ├── layout/       # AppShell, RootdHeader
│   └── routing/      # ProtectedRoute
├── layouts/          # DashboardShell, DirectorLayout, AthleteLayout
└── pages/
    ├── public/       # Home, About, Demo
    ├── athlete/      # 3 athlete pages
    ├── director/     # 5 director pages
    └── dashboard/    # 6 business pages
```
