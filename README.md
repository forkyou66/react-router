# react_router_app

React Router 8 (framework mode, SSR), TypeScript, Tailwind 4, Axios, Socket.io. Node.js 26 LTS, port 5173 everywhere.

## Commands

- `npm run dev` - dev server on :5173
- `npm run build && npm start` - production on :5173
- `npm run typecheck | lint | format`
- `docker build -t react_router_app . && docker run -p 5173:5173 react_router_app`

## Layout

- `app/routes` - views only (compose hooks + components)
- `app/components` - dumb UI
- `app/hooks` - state and side effects (`useThing.ts`)
- `app/services` - Axios and Socket.io, no React
- `app/config`, `app/types` - env and shared types

Rules: snake_case files and values, PascalCase components/types, camelCase hooks only, arrow functions only (ESLint enforced).
