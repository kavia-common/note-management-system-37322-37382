# Nuxt Notes App

A modern Nuxt 3 application for creating, viewing, and editing notes. It ships with an "Ocean Professional" theme, a sidebar with search and note list, and a simple mock API implemented via Nuxt/Nitro server routes. You can switch to an external backend by setting environment variables and a feature flag.

## Features

- Modern "Ocean Professional" theme (clean, subtle shadows, rounded corners)
- Layout
  - Top navigation with quick actions
  - Sidebar with search and notes list
  - Main area for viewing/editing the selected note
- Pages
  - /notes: Overview (shows first note if available)
  - /notes/new: Create a note
  - /notes/[id]: View/Edit/Delete a note
- Composable `useNotes` provides CRUD and reactive state
- All API requests go through `utils/api.ts` using `runtimeConfig.public`
- Mock backend via Nitro server routes under `server/api/notes/*`
- Switchable to external backend with env + feature flag

## Project Structure

- app.vue: Root shell + Toast container
- assets/styles/theme.css: App-wide theme styles
- components/
  - TopNav.vue, Sidebar.vue, Toast.vue, ConfirmDeleteModal.vue, EmptyState.vue
  - notes/: NoteList.vue, NoteViewer.vue, NoteEditor.vue
- composables/useNotes.ts: Notes state + CRUD via apiFetch
- layouts/default.vue: Main layout (TopNav + Sidebar + Main)
- pages/
  - index.vue: Redirects to /notes
  - notes/index.vue: Overview page
  - notes/new.vue: Create note
  - notes/[id].vue: View/Edit/Delete a note
- server/api/notes/*: Mock API routes (GET/POST/PUT/DELETE)
- utils/api.ts: API base resolution + apiFetch wrapper
- plugins/toast.client.ts: Placeholder for global toast injection

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm, yarn, pnpm, or bun

### Install
- npm install
or
- pnpm install
or
- yarn install
or
- bun install

### Development
- npm run dev
Open http://localhost:3000

### Production
- npm run build
- npm run preview

## Configuration (.env)

The app reads runtime configuration from environment variables (NUXT_PUBLIC_*). See .env.example for all variables.

Key runtime variables:
- NUXT_PUBLIC_API_BASE: Default /api (points to internal mock server routes)
- NUXT_PUBLIC_BACKEND_URL: URL of an external backend API (e.g. https://api.example.com)
- NUXT_PUBLIC_FEATURE_FLAGS: JSON or CSV flags. Use USE_EXTERNAL_BACKEND=true to switch api base to NUXT_PUBLIC_BACKEND_URL
- Additional optional variables for environment, telemetry, logging, etc.

## How API Targeting Works

All requests go through `utils/api.ts`:

1) By default (no external flag), the app uses `runtimeConfig.public.apiBase` which is `/api` to hit the internal mock server routes under `server/api/notes/*`.

2) To use an external backend:
   - Set `NUXT_PUBLIC_BACKEND_URL=https://your-backend.example.com`
   - Set `NUXT_PUBLIC_FEATURE_FLAGS` to enable external usage:
     - JSON: {"USE_EXTERNAL_BACKEND": true}
       or {"use_external_backend": true}
     - CSV: USE_EXTERNAL_BACKEND=true
   - When enabled, `getApiBase()` resolves to `NUXT_PUBLIC_BACKEND_URL` instead of `/api`.

See utils/api.ts for the flag parser and resolution logic.

## Feature Flags

Provide feature flags via `NUXT_PUBLIC_FEATURE_FLAGS`. Two formats supported:
- JSON string:
  - {"USE_EXTERNAL_BACKEND": true}
- CSV key=value:
  - USE_EXTERNAL_BACKEND=true,EXAMPLE_FLAG=false

Names are case-sensitive in the code path; we check for "USE_EXTERNAL_BACKEND" or "use_external_backend".

Example values:
- For external backend:
  - JSON:
    {"USE_EXTERNAL_BACKEND": true}
  - CSV:
    USE_EXTERNAL_BACKEND=true

## Quickstart: Switch to External Backend

1) In your .env (see .env.example):
- NUXT_PUBLIC_BACKEND_URL=https://api.example.com
- NUXT_PUBLIC_FEATURE_FLAGS={"USE_EXTERNAL_BACKEND":true}

2) Start the app:
- npm run dev

3) All API calls will now be sent to https://api.example.com/notes...

If you need to switch back to mock API:
- Remove the flag and/or unset NUXT_PUBLIC_BACKEND_URL
- Or set NUXT_PUBLIC_FEATURE_FLAGS={} (or omit it)

## Notes on Mock API

- Routes live under server/api/notes:
  - GET /api/notes (list)
  - POST /api/notes (create)
  - GET /api/notes/:id (read)
  - PUT /api/notes/:id (update)
  - DELETE /api/notes/:id (delete)
- State is in-memory for the development session
- Good for local testing without a real backend

## Scripts

- npm run dev: Start dev server
- npm run build: Build for production
- npm run preview: Preview production build
- npm run lint: Run ESLint

## Environment Variables Reference (Summary)

- NUXT_PUBLIC_API_BASE: Default API base, typically /api (internal mock)
- NUXT_PUBLIC_BACKEND_URL: External backend URL used when USE_EXTERNAL_BACKEND flag is enabled
- NUXT_PUBLIC_FRONTEND_URL: Public site URL (optional)
- NUXT_PUBLIC_WS_URL: Websocket endpoint URL (optional)
- NUXT_PUBLIC_NODE_ENV: Node environment name (optional)
- NUXT_PUBLIC_NEXT_TELEMETRY_DISABLED: Disable telemetry (optional)
- NUXT_PUBLIC_ENABLE_SOURCE_MAPS: Enable source maps (optional)
- NUXT_PUBLIC_PORT: Port override (optional)
- NUXT_PUBLIC_TRUST_PROXY: Trust proxy settings (optional)
- NUXT_PUBLIC_LOG_LEVEL: Log level (optional)
- NUXT_PUBLIC_HEALTHCHECK_PATH: Healthcheck path (optional)
- NUXT_PUBLIC_FEATURE_FLAGS: JSON or CSV string for feature toggles
- NUXT_PUBLIC_EXPERIMENTS_ENABLED: Comma-separated or JSON for experiments

For detailed examples and defaults, see .env.example.

## License

MIT (or project default)
