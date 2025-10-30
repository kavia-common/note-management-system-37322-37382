# Nuxt Notes App

- Modern "Ocean Professional" theme
- Sidebar with search and note list
- Top navigation with quick actions
- Pages:
  - /notes: Overview (shows first note if available)
  - /notes/new: Create a note
  - /notes/[id]: View/Edit/Delete a note
- Composable `useNotes` provides CRUD and reactive state
- API requests go through `utils/api.ts` using `runtimeConfig.public.apiBase`
- Mock backend via Nitro server routes under `server/api/notes/*`

Environment variables (.env):
- NUXT_PUBLIC_API_BASE (default /api)
- See .env.example for full list.

Run:
- npm install
- npm run dev
