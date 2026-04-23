# Scoop Travel Planner

Full-stack travel planning application with destination discovery, AI recommendations, favorites, weather and hotel search, and admin/user management.

Detailed project guide: see README.TXT.

## Project Snapshot

- Frontend: React + TypeScript (Create React App)
- Backend: Node.js + Express + TypeScript
- Auth: JWT-based authentication
- Data: SQLite by default, PostgreSQL when DATABASE_URL is provided
- Deployment targets: Netlify (frontend) + Render (backend)

## Core Features

- User registration, login, account profile, and role support (user/admin)
- Destination browsing and filtered search
- AI destination recommendations with saveable AI favorites
- Destination-specific search and searchable favorites history
- Flight, weather, and hotel integrations
- Admin dashboard for user management
- Provider response caching for external API calls

## Repository Structure

- frontend: React client
- backend: Express API and data layer
- docs at repo root: deployment, integrations, feature summaries, and launch checklists

## Local Development

### Prerequisites

- Node.js 18+
- npm

### 1) Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2) Configure Environment

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

Recommended local values:

- backend/.env: PORT=5001
- frontend/.env: REACT_APP_API_URL=http://localhost:5001/api

Notes:

- If DATABASE_URL is empty, backend uses SQLite and creates backend/data/travel-planner.db.
- If DATABASE_URL is set (for example Neon/PostgreSQL), backend uses PostgreSQL.

### 3) Run the App

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm start
```

App URLs:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api
- Health check: http://localhost:5001/api/health

## Available Scripts

Backend (backend/package.json):

- npm run dev
- npm run build
- npm start
- npm test
- npm run migrate
- npm run migrate:generate

Frontend (frontend/package.json):

- npm start
- npm run build
- npm test

## API Routes Overview

The API mounts under /api and includes:

- /auth
- /destinations
- /admin
- /ai
- /flights
- /weather
- /hotels

## Deployment

This repo already includes deployment config:

- netlify.toml
- render.yaml
