# 09-auth — Authentication & Protected Routes

A Next.js authentication project built with TypeScript. It demonstrates user registration, sign-in, sign-out, session verification, token refresh, and protected routes, with the authentication state reflected in the UI.

## Live Demo

[**Open the live application**](https://09-auth-murex-seven.vercel.app)

## Features

- User registration and sign-in
- Sign-out and session verification
- Access-token and refresh-token cookie handling
- Token refresh when an access token is missing
- Protected profile and notes routes
- Authentication-based redirects
- Authentication-aware header: guests see **Login** and **Register**, signed-in users see **Profile**, their email, and **Logout**
- Session restore on page reload
- Server-side API requests with cookie forwarding
- Client-side authentication state management with Zustand
- API requests using Axios and TanStack Query

## Tech Stack

- **Next.js** — App Router and Route Handlers
- **React**
- **TypeScript**
- **Zustand** — client-side authentication state
- **TanStack Query** — data fetching and server-state management
- **Axios** — HTTP requests
- **Formik** and **Yup** — form handling and validation
- **CSS Modules** — component styling
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
4. After sign-in or sign-up, the user is saved to the Zustand store, which also marks the user as authenticated.
5. On every page load, `AuthProvider` checks the session, attempts to refresh it when an access token is missing and a refresh token is available, and then loads the current user. If the session is invalid, the store is cleared.
6. The header reads the store and switches between guest links and the signed-in menu.
7. On sign-out, the store is always cleared and the user is redirected to `/sign-in`.
8. The route proxy protects `/profile` and `/notes`. Unauthenticated users attempting to access protected routes are redirected to `/sign-in`.

## Project Structure

```text
09-auth/
├── app/
│   ├── (auth routes)/          # Public pages: sign-in, sign-up
│   ├── (private routes)/       # Protected pages
│   │   ├── notes/              # Notes list, filters, details, create
│   │   └── profile/            # Profile and profile editing
│   ├── @modal/                 # Parallel route for modals
│   │   └── (.)notes/[id]/      # Intercepting route: note preview
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx                # Home page
├── components/
│   ├── layout/
│   │   ├── AuthNavigation/     # Guest and signed-in navigation links
│   │   └── Header/             # Site header
│   ├── AuthProvider/           # Session check and user loading on app start
│   ├── AvatarPicker/
│   ├── Footer/
│   ├── Modal/
│   ├── NoteForm/
│   ├── NoteList/
│   ├── NotePreview/
│   ├── NotesSidebar/
│   ├── Pagination/
│   ├── SearchBox/
│   └── TanStackProvider/
├── lib/
│   ├── api/                    # api.ts, clientApi.ts, serverApi.ts
│   └── store/                  # authStore.ts, noteStore.ts (Zustand)
├── types/                      # note.ts, user.ts
├── public/
├── proxy.ts                    # Route protection and auth redirects
└── next.config.ts
```

## Notes

This application depends on a separate backend API. Configure the correct API URL before running it locally.

Never commit credentials, private API keys, or `.env.local` to the repository.

## Author

**Andrii Mitko**

- GitHub: [@Andrii-Mitko](https://github.com/Andrii-Mitko)
- LinkedIn: [Andrii Mitko](https://www.linkedin.com/in/andrii-mitko/)
- Portfolio: [andrii-mitko-brand.vercel.app](https://andrii-mitko-brand.vercel.app/)

---

Built with Next.js, React, and TypeScript.
