SCOOP TRAVEL PLANNER - DETAILED PROJECT README

============================================================
1) Project Overview
============================================================

Scoop Travel Planner is a full-stack web application for planning trips with:
- account-based access (user and admin roles)
- AI-assisted destination recommendations
- destination search with date-based context
- flight, weather, and hotel integrations
- user favorites for both standard destination results and AI results

The project is split into:
- frontend: React + TypeScript (Create React App)
- backend: Express + TypeScript REST API
- database: SQLite by default, PostgreSQL when DATABASE_URL is provided


============================================================
2) Current Repository Layout
============================================================

Root:
- README.md                     -> concise project summary
- README.TXT                    -> this detailed guide
- netlify.toml                  -> frontend deployment config (Netlify)
- render.yaml                   -> backend deployment config (Render)
- app.js, index.html, login.html, register.html, result.html
  Legacy static/prototype files (not used by the React app runtime)

Backend:
- backend/src/server.ts         -> server bootstrap and graceful shutdown
- backend/src/app.ts            -> middleware, CORS policy, route mounting
- backend/src/controllers/*     -> request handling + validation
- backend/src/routes/*          -> endpoint grouping
- backend/src/services/*        -> provider integrations, helpers, cache
- backend/src/config/*          -> db adapters and data-store abstraction
- backend/src/migrations/*      -> SQL schema + migration runner
- backend/src/tests/*           -> Jest tests

Frontend:
- frontend/src/App.tsx          -> route map and session state glue
- frontend/src/pages/*          -> page-level UI (Search, Favorites, Admin, etc.)
- frontend/src/components/*     -> reusable components
- frontend/src/services/api.ts  -> Axios client and API wrappers


============================================================
3) Tech Stack
============================================================

Frontend
- React 18
- TypeScript
- React Router v6
- Axios
- react-scripts (CRA)

Backend
- Node.js + Express
- TypeScript
- JWT authentication (jsonwebtoken)
- Input validation (express-validator)
- Security headers (helmet)
- Logging (morgan)
- CORS middleware

Data
- SQLite (sqlite3) for default local development
- PostgreSQL (pg) when DATABASE_URL is set

Testing
- Jest + ts-jest (backend)


============================================================
4) Core Features
============================================================

Authentication and Accounts
- register, login, current-user profile fetch
- profile updates
- role support: user/admin

Destination Discovery
- destination listing
- filtered search by month, budget, and tags
- image lookup endpoint
- save travel preferences

Favorites
- classic destination favorites
- AI recommendation favorites
- destination-specific search favorites

AI Recommendations
- AI endpoint for ranked destination recommendations
- provider-configurable backend (OpenAI/Google style configuration)

Travel Integrations
- airport search and cheapest-flight workflow
- weather forecast by city and date range
- hotel search and best-hotel selection

Admin Features
- admin-only user CRUD endpoints


============================================================
5) Frontend Route Map
============================================================

Configured in frontend/src/App.tsx:
- /                    -> Home
- /login               -> Login
- /register            -> Register
- /search              -> Search
- /destination-search  -> DestinationSearch
- /ai-results          -> AIResults
- /favorites           -> Favorites
- /admin               -> AdminDashboard
- /account             -> Account

Authentication behavior
- token and user are stored in localStorage
- Axios request interceptor adds Authorization: Bearer <token>


============================================================
6) Backend API Summary
============================================================

Base URL (local):
- http://localhost:5001/api

Health endpoint:
- GET /api/health

Auth routes (/api/auth)
- POST /register
  body: { displayName, email, password }
- POST /login
  body: { email, password }
- GET /me (auth required)
- PUT /update-profile (auth required)

Destination routes (/api/destinations) - all require auth
- GET /search
  query: month (1-12), budget (budget|moderate|luxury), tags
- GET /image
  query: query (string)
- GET /
- GET /:id
- POST /preferences
- POST /search-specific
- POST /favorites
- GET /favorites/list
- POST /search-favorites
- GET /search-favorites/list

Admin routes (/api/admin) - auth + admin role required
- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

AI routes (/api/ai)
- POST /recommendations (auth required)
  body: { month, budget?, interests[] }
- POST /favorites (auth required)
- GET /favorites (auth required)

Flight routes (/api/flights) - auth required
- GET /airports
  query: keyword
- POST /cheapest
  body:
  {
    origin,
    departureDate,
    returnDate,
    currency?,
    destinations: [{ country?, capital? }, ...]
  }

Weather routes (/api/weather) - auth required
- GET /forecast
  query: city, startDate, endDate

Hotel routes (/api/hotels) - auth required
- POST /search
  body: { location, checkInDate, checkOutDate, currency? }
- POST /best
  body: { location, checkInDate, checkOutDate }


============================================================
7) Environment Variables
============================================================

Backend (.env)

Server
- PORT=5001
- NODE_ENV=development|production

Database
- DATABASE_URL=
  Leave empty for SQLite.
  Set to PostgreSQL connection string to enable Postgres adapter.

Auth and Security
- JWT_SECRET=<strong random secret>
- JWT_EXPIRES_IN=7d
- FRONTEND_URL=http://localhost:3000

AI Provider
- AI_PROVIDER=openai (or other supported provider mode)
- AI_API_KEY=
- AI_MODEL=gpt-4o-mini
- AI_API_URL=https://api.openai.com/v1/chat/completions
- AI_MAX_TOKENS=4000
- AI_API_VERSION= (optional, for provider-specific use)

Admin Seeding/Defaults
- ADMIN_EMAIL=
- ADMIN_PASSWORD=
- ADMIN_DISPLAY_NAME=
- ADMIN2_EMAIL=
- ADMIN2_PASSWORD=
- ADMIN2_DISPLAY_NAME=

Travel/External Providers
- VISUAL_CROSSING_API_KEY=
- OPENTRIPMAP_API_KEY=
- PIXABAY_API_KEY=
- UNSPLASH_API_KEY=
- PEXELS_API_KEY=
- AMADEUS_API_KEY=
- AMADEUS_API_SECRET=

Optional Cache and Provider Tuning
- REDIS_URL=
- NOMINATIM_BASE_URL=
- OPENMETEO_BASE_URL=
- OPENTRIPMAP_BASE_URL=
- DEFAULT_IMAGE_URL=
- CACHE_TTL_GEOCODING=
- CACHE_TTL_WEATHER=
- CACHE_TTL_POI=

Frontend (.env)
- REACT_APP_API_URL=http://localhost:5001/api


============================================================
8) Local Development Setup (Step-by-Step)
============================================================

1. Install prerequisites
- Node.js 18+ (Node 20 recommended)
- npm

2. Install backend dependencies

   cd backend
   npm install

3. Install frontend dependencies

   cd frontend
   npm install

4. Configure environment files

   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

5. Run backend

   cd backend
   npm run dev

6. Run frontend in another terminal

   cd frontend
   npm start

7. Verify
- Frontend: http://localhost:3000
- API health: http://localhost:5001/api/health


============================================================
9) Scripts Reference
============================================================

Backend (backend/package.json)
- npm run dev
  Starts API in development with ts-node-dev.

- npm run build
  Compiles TypeScript to dist.

- npm start
  Runs compiled backend from dist/server.js.

- npm test
  Runs Jest tests.

- npm run migrate
  Runs SQL migrations with migration runner.

- npm run migrate:generate <name>
  Generates timestamped SQL migration template.

Frontend (frontend/package.json)
- npm start
  Starts CRA dev server.

- npm run build
  Builds production static bundle.

- npm test
  Runs CRA test runner.


============================================================
10) Database and Data-Store Strategy
============================================================

Dual-mode database access is implemented in backend/src/config/dataStore.ts:
- If DATABASE_URL exists: PostgreSQL adapter is used.
- Otherwise: SQLite adapter is used.

Key persisted data entities:
- users
- destinations
- preferences
- user_favorites
- user_ai_favorites
- user_destination_favorites
- cache

SQLite file location (default)
- backend/data/travel-planner.db

Startup behavior
- schema creation and index setup run automatically
- admin bootstrap helper is invoked from DB initialization flow


============================================================
11) Authentication and Authorization Model
============================================================

Authentication
- JWT is issued on login/register.
- Frontend stores token in localStorage as token.
- Backend middleware authenticate validates token on protected routes.

Authorization
- Admin-only routes are protected by authenticate + authorizeAdmin.

Validation
- express-validator is used in controllers for route-specific validation.


============================================================
12) AI Recommendation Behavior
============================================================

The AI controller supports configurable provider/model settings through env vars.

Important details:
- recommendation request validates month/budget/interests
- AI output parsing includes cleanup and fallback handling
- normalized recommendation structure includes rank, country, score,
  highlights, activities, and budget explanation


============================================================
13) External Integrations (Backend Services)
============================================================

The backend includes integrations/service modules for:
- flights (Amadeus)
- weather (Visual Crossing / Open-Meteo-related services)
- hotels
- geocoding/location and images
- cached provider responses

Because these are external APIs:
- missing API keys can reduce features or return limited responses
- always verify provider-specific env vars in deployment


============================================================
14) CORS and Security Notes
============================================================

CORS policy in backend/src/app.ts currently allows:
- http://localhost:3000
- a configured Netlify domain
- any origin ending with .netlify.app

Security middleware:
- helmet enabled
- JSON body parsing enabled
- centralized error handling and 404 route

Production recommendations:
- set a strong JWT_SECRET
- avoid committing .env files
- restrict CORS to explicit production origins only
- rotate any previously exposed secrets or tokens


============================================================
15) Testing
============================================================

Backend tests exist under:
- backend/src/tests/auth.test.ts
- backend/src/tests/destinations.test.ts

Run tests:

   cd backend
   npm test

If tests fail due to env/database setup, confirm:
- backend dependencies are installed
- required env vars are present
- test environment can initialize the selected DB mode


============================================================
16) Deployment
============================================================

Backend deployment (Render)
- Config is in render.yaml
- rootDir: backend
- build: npm install --include=dev && npm run build
- start: npm start
- health check: /api/health
- node runtime target: Node 20

Critical backend env vars on Render:
- DATABASE_URL
- JWT_SECRET
- FRONTEND_URL
- AI and provider keys as needed

Frontend deployment (Netlify)
- Config is in netlify.toml
- base: frontend
- build command: CI=false npm install && CI=false npm run build
- publish directory: build
- SPA redirect to /index.html configured

Critical frontend env var on Netlify:
- REACT_APP_API_URL=https://<your-backend-domain>/api

Post-deploy checks:
- backend /api/health returns status ok
- frontend can register/login
- authenticated routes work with token
- CORS accepts your frontend domain


============================================================
17) Troubleshooting Guide
============================================================

Problem: frontend cannot call backend
- Verify backend is running on expected port.
- Verify REACT_APP_API_URL points to /api.
- Verify backend CORS allows your origin.

Problem: 401 Unauthorized on protected routes
- Confirm token exists in localStorage.
- Confirm Authorization header is sent by Axios interceptor.
- Re-login to refresh expired token.

Problem: migration command cannot find files
- Run from backend directory.
- Ensure SQL files exist in backend/src/migrations/migrations.

Problem: external provider features return empty or fail
- Check provider API keys in backend .env.
- Check provider quotas and rate limits.

Problem: admin routes return 403
- Ensure logged-in user role is admin.


============================================================
18) Recommended Development Workflow
============================================================

1. Create feature branch.
2. Implement backend changes with route validation.
3. Update frontend API wrapper in frontend/src/services/api.ts.
4. Test endpoint manually and with Jest where relevant.
5. Run frontend and verify route behavior end-to-end.
6. Build backend and frontend before merging.


============================================================
19) Known Project Notes
============================================================

- The root README.md references additional docs that are not currently present.
  This README.TXT contains the complete consolidated guidance for the current
  repository state.

- The repository currently contains modified/deleted files in local git status.
  Review changes carefully before committing and pushing.


============================================================
20) License
============================================================

Backend package metadata specifies MIT license.
If you need a repository-level license file, add a root LICENSE file to make
licensing explicit across the full project.


END OF FILE