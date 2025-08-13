# Vercel Deployment Guide (Single Project)

This guide will help you deploy your MathQuest application on Vercel as a single project with both frontend and backend.

## Prerequisites

1. A Vercel account
2. Git repository connected to Vercel
3. A PostgreSQL database (you can use Vercel Postgres, Supabase, or any other PostgreSQL provider)

## Deployment Steps

### 1. Deploy Backend API

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the **Root Directory** to `backend`
5. Configure the following settings:
   - **Framework Preset**: Other
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: Leave empty
   - **Install Command**: Leave empty

6. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `APP_SECRET_KEY`: Generate a random secret key

7. Deploy the project

### 2. Deploy Frontend

1. In Vercel Dashboard, click "New Project" again
2. Import the same GitHub repository
3. **Important**: Set the **Root Directory** to `frontend`
4. Configure the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_API_URL`: Set this to your backend API URL (e.g., `https://your-backend.vercel.app`)

6. Deploy the project

### 3. Database Setup

You have several options for the PostgreSQL database:

#### Option A: Vercel Postgres (Recommended)
1. In your Vercel dashboard, go to "Storage"
2. Create a new Postgres database
3. Copy the connection string to your backend environment variables

#### Option B: Supabase
1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Copy the connection string to your backend environment variables

#### Option C: Railway Postgres
1. Create a PostgreSQL service on Railway
2. Copy the connection string to your backend environment variables

### 4. Database Migrations and Seeding

After setting up the database, you'll need to run migrations and seed data:

1. **Option 1: Use Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Run migrations and seed data
   cd backend
   vercel env pull .env
   python -c "
   from alembic.config import Config
   from alembic import command
   config = Config('alembic.ini')
   command.upgrade(config, 'head')
   "
   python scripts/seed.py
   ```

2. **Option 2: Use a database management tool**
   - Connect to your database using a tool like pgAdmin or DBeaver
   - Run the SQL from the migration files manually
   - Run the seed script locally with the production database URL

## Environment Variables

### Backend Environment Variables
```
DATABASE_URL=postgresql://username:password@host:port/database
APP_SECRET_KEY=your-secret-key-here
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend.vercel.app
```

## File Structure

```
prouvers/
├── backend/           # Python Flask API
│   ├── app.py
│   ├── requirements.txt
│   ├── vercel.json    # Vercel configuration
│   └── src/
├── frontend/          # React + Vite
│   ├── package.json
│   ├── vercel.json    # Vercel configuration
│   └── src/
├── docker-compose.yml # Local development only
└── VERCEL_DEPLOYMENT.md # This deployment guide
```

## Troubleshooting

### Build Errors
- Ensure all dependencies are listed in `requirements.txt` (backend) and `package.json` (frontend)
- Check that the root directory is correctly set for each deployment

### Database Connection Issues
- Verify the `DATABASE_URL` is correctly set in the backend environment variables
- Ensure the database is accessible from Vercel's servers
- Check that migrations have been run

### CORS Issues
- The backend is configured to allow all origins (`*`) for development
- For production, you may want to restrict this to your frontend domain

### API Not Found
- Ensure the backend is deployed and accessible
- Check that the `VITE_API_URL` is correctly set in the frontend environment variables

## Local Development

For local development, you can still use Docker Compose:

```bash
docker-compose up -d
```

This will start a PostgreSQL database locally. The backend and frontend can be run separately:

```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install
npm run dev
```

## Advantages of Vercel

1. **Automatic deployments** from Git
2. **Global CDN** for fast loading
3. **Serverless functions** for the backend
4. **Built-in analytics** and monitoring
5. **Easy environment variable management**
6. **Free tier** available for both frontend and backend
