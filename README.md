# MathQuest - Interactive Math Learning App

Full-stack app with Flask (Python) backend and React (Vite + Tailwind) frontend.

## Quickstart (<10 minutes)

Prereqs: Node 18+, Python 3.11+, Docker (for PostgreSQL).

1) Start PostgreSQL

```bash
# from project root
docker-compose up -d db
```

2) Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate  # Windows PowerShell
pip install -r requirements.txt
# Create .env file with:
# FLASK_ENV=development
# DATABASE_URL=postgresql+pg8000://postgres:admin1234@localhost:5432/mathquest
# APP_SECRET_KEY=dev-secret-change-me
# XP_PER_CORRECT=10
# PORT=5001
alembic upgrade head
python scripts/seed.py
python app.py
```

This starts the API at http://localhost:5001.

**API Documentation:** Visit http://localhost:5001/docs for interactive Swagger documentation.

3) Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open http://localhost:5173.

## Deployment with Railway

### Prerequisites
- GitHub account with this repository
- Railway account (free at [railway.app](https://railway.app))

### Step-by-Step Deployment

1. **Connect to Railway**
   ```bash
   # Go to railway.app and sign in with GitHub
   # Click "New Project" → "Deploy from GitHub repo"
   # Select your MathQuest repository
   ```

2. **Add PostgreSQL Database**
   ```bash
   # In Railway dashboard, click "New" → "Database" → "PostgreSQL"
   # This creates a managed PostgreSQL instance
   ```

3. **Deploy Backend Service**
   ```bash
   # In Railway dashboard, click "New" → "GitHub Repo"
   # Select your repo and set:
   # - Root Directory: backend
   # - Build Command: pip install -r requirements.txt && alembic upgrade head && python scripts/seed.py
   # - Start Command: python app.py
   ```

4. **Configure Environment Variables**
   ```bash
   # In your backend service settings, add:
   DATABASE_URL=postgresql://[from-railway-postgres-service]
   APP_SECRET_KEY=your-production-secret-key
   XP_PER_CORRECT=10
   PORT=5001
   FLASK_ENV=production
   ```

5. **Deploy Frontend Service**
   ```bash
   # In Railway dashboard, click "New" → "Static Site"
   # Set:
   # - Root Directory: frontend
   # - Build Command: npm install && npm run build
   # - Output Directory: dist
   ```

6. **Update Frontend API URL**
   ```bash
   # In frontend/.env.production (create if needed):
   VITE_API_BASE=https://your-backend-service-url.railway.app
   ```

### Railway Configuration Files

**backend/railway.json** (create this file):
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python app.py",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

**frontend/railway.json** (create this file):
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

### Environment Variables Reference

**Backend (.env):**
```bash
FLASK_ENV=production
DATABASE_URL=postgresql://[railway-postgres-url]
APP_SECRET_KEY=your-secure-production-key
XP_PER_CORRECT=10
PORT=5001
```

**Frontend (.env.production):**
```bash
VITE_API_BASE=https://your-backend-service-url.railway.app
```

### Post-Deployment

1. **Verify Backend:**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status": "ok"}`

2. **Verify API Docs:**
   - Visit: `https://your-backend-url.railway.app/docs`
   - Should show Swagger documentation

3. **Verify Frontend:**
   - Visit: `https://your-frontend-url.railway.app`
   - Should load the MathQuest app

4. **Test Full Flow:**
   - Complete a lesson
   - Check XP and streak updates
   - Verify database persistence

### Troubleshooting

**Common Issues:**
- **Database Connection:** Ensure `DATABASE_URL` is set correctly
- **CORS Errors:** Backend CORS is configured for all origins
- **Build Failures:** Check Railway logs for dependency issues
- **Port Issues:** Railway auto-assigns ports, use `PORT` env var

**Railway Logs:**
```bash
# View logs in Railway dashboard or CLI:
railway logs
```

## API Endpoints
- GET `/api/lessons` → lesson list with progress
- GET `/api/lessons/:id` → lesson detail with problems (no correct answers leaked)
- POST `/api/lessons/:id/submit` → idempotent scoring with `attempt_id`, returns XP, streak, progress
- GET `/api/profile` → overall stats

**Interactive Documentation:** All endpoints are documented with examples at `/docs`

## XP, Streak, Idempotency
- XP per correct: `10` (configurable via `XP_PER_CORRECT`)
- Streak increments on first submit of a new UTC day; resets if a day is missed; unchanged on multiple submits same day
- Idempotency: `attempt_id` unique via `submissions.attempt_id`; duplicate returns 409

## Database Schema
Tables: `users`, `lessons`, `problems`, `problem_options`, `submissions`, `user_progress`, `user_problem_progress`.
Uses PostgreSQL; migrations via Alembic; seed data creates demo user (id=1) and 3 lessons.

## Tests

```bash
cd backend
pytest
```

Covers streak transitions and `/submit` idempotency + validation.

## Setup and Seed Instructions

### Database Setup
1. Start PostgreSQL: `docker-compose up -d db`
2. Create `.env` file in backend with PostgreSQL connection string
3. Run migrations: `alembic upgrade head`
4. Seed data: `python scripts/seed.py`

### Seed Data Includes
- Demo user (id=1, username="demo")
- 3 lessons: Basic Arithmetic, Multiplication Mastery, Division Basics
- 9 total problems (3 per lesson) with MCQ and input types
- Proper problem options and correct answers

## Time Spent and What Was Cut

**Time Spent:** ~3 hours total
- Backend architecture & API: 1 hours
- Database schema & migrations: 0.5 hour  
- Frontend React components: 1 hour
- Testing & documentation: 0.5 hours

**What Was Cut/Didn't Build:**
- Authentication system (schema is multi-user ready)
- Advanced animations and micro-interactions
- CI/CD pipeline
- Spaced repetition algorithms
- Leaderboards and social features

## Engaging Post-Lesson Progress Reveals

**Current Implementation:**
- Celebratory "Great job!" card with XP earned
- Animated progress bar with smooth transitions
- Streak counter with best streak display
- Visual feedback showing correct answers vs total

**Motivation Strategy for Teens:**
1. **Immediate Gratification:** Instant XP feedback and progress visualization
2. **Streak Psychology:** Daily engagement through streak counters and "best streak" tracking
3. **Visual Progress:** Animated progress bars that fill up, creating satisfying completion feeling
4. **Achievement Recognition:** Clear celebration of accomplishments with specific numbers

**Future Enhancements:**
- Confetti animations for perfect scores
- Badge system for milestones (10-day streak, 100 XP, etc.)
- Sound effects for correct answers
- Personalized encouragement messages
- Progress sharing capabilities
- Weekly/monthly progress summaries

## Scaling for 1000+ Students

**Database Optimization:**
- Indexed queries on user_progress, submissions, and problem lookups
- Connection pooling with SQLAlchemy
- Read replicas for lesson content (heavily read, rarely written)

**Application Layer:**
- Redis for caching frequently accessed data (lesson lists, user progress)
- Rate limiting on submission endpoints
- Horizontal scaling with load balancers
- Background job processing for analytics

**Infrastructure:**
- Containerized deployment with Docker
- Auto-scaling based on concurrent user load
- CDN for static assets
- Database connection pooling (PgBouncer)

## Product Review (fokuslah.com)

**What Works Well for Teens:**
1. **Clear Progression:** Simple lesson list with visual progress indicators makes it easy to see where they are and what's next
2. **Bite-sized Learning:** Short, focused lessons (3-5 problems) prevent cognitive overload and maintain attention
3. **Gamification Elements:** XP system and streak counters create addictive feedback loops that encourage daily engagement

**Specific Improvements Needed:**
1. **Visual Appeal:** Current design is functional but lacks the vibrant, playful aesthetic that appeals to teens - needs more colors, emojis, and modern UI elements
2. **Immediate Feedback:** Add real-time validation and hints during problem-solving, not just after submission
3. **Personalization:** Implement adaptive difficulty based on performance and spaced repetition scheduling to optimize learning retention
4. **Social Elements:** Add friend challenges, leaderboards, and progress sharing to leverage peer motivation 