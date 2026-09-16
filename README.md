# Flowly — Project Management Dashboard

A full-stack recreation of the Flowly dashboard UI: React + TypeScript on the
frontend, Node/Express + MongoDB on the backend, with fully dynamic data
(nothing is hardcoded — every widget is fetched from the database per project).

```
flowly-dashboard/
├── backend/     Express + MongoDB API (auth, projects, dashboard data)
└── frontend/    React + TypeScript + Vite client
```

## Features

- **Sidebar** — Flowly branding with a project switcher, search, the exact
  Main / Analytics / Support navigation groups from the design, an
  "AI Insight Hub" button, and a user card with **Logout**.
- **New Project** — button in the sidebar's project switcher opens a modal
  that creates a brand-new project in MongoDB, seeded with its own randomized
  dataset, and switches you into it immediately.
- **Header** — search bar, light/dark theme toggle, notifications, an AI chat
  shortcut, and an avatar menu with Profile / Settings / **Logout**.
- **Login / Register / Logout** — JWT-based auth. Registering auto-creates a
  starter project so the dashboard is never empty.
- **Dashboard widgets**, all backed by MongoDB collections and rendered from
  live API data:
  - Total Revenue, MRR, Churn Rate, New Clients, NRR stat cards
  - Revenue & MRR Dynamics chart (bar + line, Recharts)
  - AI Insights panel (risk/forecast cards + chat input)
  - Client Segmentation pie chart
  - Feature Usage adoption bars
  - Customer Satisfaction / NPS breakdown
  - Conversion Funnel, Sales Cycle, Support Tickets

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env      # edit MONGO_URI / JWT_SECRET if needed
npm run seed               # creates demo@flowly.app / demo1234 with sample data
npm run dev                 # starts the API on http://localhost:5000
```

Requires a running MongoDB instance (local `mongod` or a MongoDB Atlas URI in
`.env`).

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env       # points VITE_API_URL at the backend
npm run dev                 # starts the app on http://localhost:5173
```

Log in with the seeded demo account, or click **Sign up** to create your own
account (a starter project with live data is generated automatically).

## 3. Deployment on Render

The root `render.yaml` defines both services in one Render project:

- `flowly-backend` is a Node web service running `npm start` from `backend`.
- `flowly-frontend` is a static site built from `frontend` and served from `dist`.

In Render, choose **New > Blueprint**, connect this repository, and apply the
`render.yaml` file. Set the backend `MONGO_URI` when Render prompts for it.
`JWT_SECRET` is generated automatically. The frontend uses
`https://flowly-backend.onrender.com/api` and the backend allows
`https://flowly-frontend.onrender.com` by default.

If Render assigns different service names or domains, update these environment
variables in the same Render project and redeploy both services:

```text
CLIENT_ORIGIN=https://<actual-frontend>.onrender.com
VITE_API_URL=https://<actual-backend>.onrender.com/api
```

Add the backend service's database access in MongoDB Atlas Network Access.

## How the data stays dynamic

- Every dashboard number lives in MongoDB (`Metric`, `RevenuePoint`,
  `Insight`, `ClientSegment`, `FeatureUsage`, `Nps`, `FunnelStage`,
  `SalesCycleStage`, `SupportTicket` — see `backend/src/models/DashboardModels.js`).
- `backend/src/seed/seedProjectData.js` generates a fresh, randomized dataset
  for every new project (on register **and** on "New Project"), so no two
  projects show identical numbers.
- The frontend's `GET /api/dashboard/:projectId` endpoint aggregates all of
  the above per project and the React `Dashboard` page renders it — swap in
  real business data by writing to those same collections.

## Extending it

The `Revenue`, `Customer Analytics`, `Product`, `Sales & Funnel`, `Settings`,
`Integrations`, and `Support & Success` sidebar links currently open a
placeholder page (`frontend/src/pages/PlaceholderPage.tsx`) that reuses the
same Sidebar/Header shell. Give each one its own backend route the same way
`dashboardController.js` does, and swap the placeholder for a real page.
