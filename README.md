# AlumniConnect Institute Network

Verified institute-based alumni-student networking platform built with the MERN stack.

## Structure

- `client` - React + Vite frontend with Tailwind CSS and React Router.
- `server` - Node.js + Express.js API with MongoDB connection setup.

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create environment files:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

3. Update `server/.env` with a valid `MONGO_URI`, a `JWT_SECRET` of at least 32 characters, and `NODE_ENV=development`. Keep `CLIENT_URL=http://localhost:5173`. In `client/.env`, use `VITE_API_BASE_URL=http://localhost:5000/api`. Do not overwrite existing environment files or commit them.

4. Run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend health check: `http://localhost:5000/api/health`

## Current MVP Modules

- JWT authentication for all platform roles
- Frontend login flow with protected role-based routes
- Public institute registration request form
- Super admin institute approval and rejection workflow
- Institute admin student and alumni user management with institute-scoped access control
- Student profile create, view, and update flow
- Alumni profile create, view, and update flow with verification status tracking
- Institute admin alumni profile verification and rejection workflow
- Student-only verified alumni search and detail views scoped to the same institute
- Student-to-alumni connection requests with student tracking and alumni accept/reject actions
- Student-to-alumni guidance and referral requests with alumni response and completion workflow
- Alumni-posted opportunities with institute-admin approval and student visibility for approved listings
- Institute-admin announcements and events with audience-scoped visibility for students and alumni
- Automated database-backed notifications for connections, guidance, opportunities, announcements, events, and alumni verification actions

## Frontend UI

Public screens use an ivory and forest palette. The authenticated workspace uses cobalt and
cream, horizontal grouped navigation, personalized dashboard introductions, an inline metrics
strip, and a featured action alongside grouped action lists. On mobile, the menu button
expands navigation below the header. All four roles retain their existing routes and actions.
Light/dark themes persist in the browser; workspace styles are scoped to authenticated pages.

UI checks: run `npm run build --prefix client` and `npm run lint --prefix client`.
With the API running, sign in with each role and check the navigation groups, dashboard
links, notifications, account menu/logout, and forms. Repeat at mobile width and in dark mode.

To preview only the frontend (public screens do not require MongoDB):

```bash
npm run dev:client
```

Sign-in and live workspace data require the backend, MongoDB, and an existing account.
For a new institute, use the registration page; approval by a super admin is required.

Frontend checks:

```bash
npm run lint --prefix client
npm run build --prefix client
```

For a visual smoke test, check the landing page, login, and institute registration at desktop
and mobile widths. With each role, check its dashboard, navigation, forms, lists, and theme
switching. For students, also check alumni filters and opportunity details; for administrators,
check approval screens. Backend authorization and API contracts are unchanged by the UI refresh.

The inner workspace includes an alumni member directory with a filter rail, a career board,
calendar-style event cards, campus bulletin cards, and live profile previews. A compact institute label sits alongside the role-specific navigation. These changes
are presentation-only; existing API calls, profile saves, requests, and approval flows remain.

The final UI pass removes duplicate navigation and dashboard actions, reduces decorative
headers, and limits directory skill previews to three tags (full skills remain on profiles).
