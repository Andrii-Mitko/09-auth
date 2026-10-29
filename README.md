# 09-auth — Authentication & Protected Routes

A Next.js authentication project built with TypeScript. It demonstrates an authentication flow with user registration, sign-in, sign-out, session verification, token refresh, and protected routes.

## Live Demo

**[Open the live application](https://09-auth-murex-seven.vercel.app)**

## Features

- User registration and sign-in
- Sign-out and session verification
- Access-token and refresh-token cookie handling
- Token refresh when an access token is missing
- Protected profile and notes routes
- Authentication-based redirects
- Server-side API requests with cookie forwarding
- Client-side authentication state management with Zustand
- API requests using Axios and TanStack Query

## Tech Stack

- **Next.js** — App Router and Route Handlers
- **React**
- **TypeScript**
- **Zustand** — client-side state management
- **TanStack Query** — data fetching and server-state management
- **Axios** — HTTP requests
- **Formik** and **Yup** — form handling and validation
- **Vercel Analytics** — analytics

## Getting Started

### Prerequisites

- Node.js
- npm
- Access to the backend API used by the application

### Installation

```bash
git clone https://github.com/Andrii-Mitko/09-auth.git
cd 09-auth
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-api-host
```

Replace the example value with the actual backend API base URL. The application appends `/api` to this URL.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the application        |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

## Authentication Flow

1. Users register or sign in through the authentication pages.
2. Next.js Route Handlers forward authentication requests to the backend API.
3. The server handles authentication cookies.
4. The application checks the session and attempts to refresh it when an access token is missing and a refresh token is available.
5. The route proxy protects `/profile` and `/notes`.
6. Unauthenticated users attempting to access protected routes are redirected to `/sign-in`.

## Project Structure

- `app/api/auth/` — authentication API routes
- `app/(auth routes)/` — sign-in and sign-up pages
- `lib/api/` — API clients and server-side API helpers
- `proxy.ts` — route protection and authentication redirects
- `components/AuthProvider/` — client-side authentication initialization

## Notes

This application depends on a separate backend API. Configure the correct API URL before running it locally.

Never commit credentials, private API keys, or `.env.local` to the repository.

---

Built with Next.js, React, and TypeScript.
