# Railway Deployment Guide

This is a monorepo containing both frontend and backend services. To deploy on Railway, you need to create separate services for each part of the application.

## Prerequisites

1. A Railway account
2. Git repository connected to Railway

## Deployment Steps

### 1. Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository

### 2. Add Backend Service

1. In your Railway project, click "New Service"
2. Choose "GitHub Repo"
3. Select the same repository
4. **Important**: Set the **Root Directory** to `backend`
5. Railway will automatically detect it as a Python application
6. Add the following environment variables:
   - `DATABASE_URL` (Railway will provide this when you add a PostgreSQL service)
   - `APP_SECRET_KEY` (generate a random string)
   - `PORT` (Railway will set this automatically)

### 3. Add Frontend Service

1. In your Railway project, click "New Service" again
2. Choose "GitHub Repo"
3. Select the same repository
4. **Important**: Set the **Root Directory** to `frontend`
5. Railway will automatically detect it as a Node.js application
6. Add the following environment variables:
   - `VITE_API_URL` (set this to your backend service URL, e.g., `https://your-backend-service.railway.app`)

### 4. Add PostgreSQL Database

1. In your Railway project, click "New Service"
2. Choose "Database" → "PostgreSQL"
3. Railway will automatically create the database
4. Copy the `DATABASE_URL` from the PostgreSQL service
5. Add this URL as an environment variable in your backend service

### 5. Configure Domains

1. For each service, go to the "Settings" tab
2. Click "Generate Domain" or add a custom domain
3. Update the `VITE_API_URL` in your frontend service to use the backend domain

## Environment Variables

### Backend Service
```
DATABASE_URL=postgresql://username:password@host:port/database
APP_SECRET_KEY=your-secret-key-here
PORT=5001
```

### Frontend Service
```
VITE_API_URL=https://your-backend-service.railway.app
```

## Troubleshooting

### Build Errors
- Ensure the root directory is correctly set for each service
- Check that all dependencies are properly listed in `requirements.txt` (backend) and `package.json` (frontend)

### Database Connection Issues
- Verify the `DATABASE_URL` is correctly set in the backend service
- Ensure the PostgreSQL service is running and accessible

### CORS Issues
- The backend is configured to allow all origins (`*`) for development
- For production, you may want to restrict this to your frontend domain

## File Structure

```
prouvers/
├── backend/           # Python Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── railway.json
├── frontend/          # React + Vite
│   ├── package.json
│   └── railway.json
├── docker-compose.yml # Local development only
├── railway.toml       # Railway monorepo config
└── .railwayignore     # Excludes files from Railway builds
```

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
