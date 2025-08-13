# Railway Deployment Instructions for MathQuest

This guide will help you deploy your MathQuest application to Railway. Railway is an excellent choice for full-stack applications as it provides seamless database integration and easy deployment.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **Railway CLI** (optional): Install with `npm i -g @railway/cli`

## Quick Deployment Steps

### Method 1: Deploy via Railway Dashboard (Recommended)

1. **Connect Your Repository**:
   - Go to [railway.app/dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your MathQuest repository

2. **Railway will automatically**:
   - Detect your Python backend
   - Install dependencies from `requirements.txt`
   - Build your frontend
   - Deploy your application

3. **Add PostgreSQL Database**:
   - In your project dashboard, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically link it to your app

### Method 2: Deploy via Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Deploy**:
   ```bash
   railway up
   ```

## Configuration Files

The following configuration files have been created for Railway deployment:

### `railway.json`
- Configures the deployment settings
- Sets health check endpoint
- Configures restart policies

### `Dockerfile`
- Defines the build process using Docker
- Installs both Python and Node.js dependencies
- Builds the frontend

### `Procfile`
- Specifies the start command for the application

## Environment Variables

Railway will automatically set these environment variables:

- `PORT`: Railway will set this automatically
- `DATABASE_URL`: Automatically set when you add PostgreSQL
- `RAILWAY_STATIC_URL`: URL for your static files

### Required Environment Variables

You'll need to manually set these in Railway dashboard:

1. **App Configuration**:
   - `APP_SECRET_KEY`: A secure secret key for your Flask app
   - `VITE_API_BASE`: Your Railway app URL (e.g., `https://your-app.railway.app`)

### Setting Environment Variables

1. **In Railway Dashboard**:
   - Go to your project
   - Click on your service
   - Go to "Variables" tab
   - Add your environment variables

2. **Via Railway CLI**:
   ```bash
   railway variables set APP_SECRET_KEY=your-secret-key
   railway variables set VITE_API_BASE=https://your-app.railway.app
   ```

## Database Setup

### Automatic PostgreSQL Setup

1. **Add PostgreSQL Service**:
   - In Railway dashboard, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically create and link the database

2. **Database Migrations**:
   - Railway will automatically run your Flask app
   - Your database will be initialized when the app starts

### Manual Database Setup (Optional)

If you prefer to use an external database:

1. **Set up PostgreSQL** (e.g., on Supabase, AWS RDS, or DigitalOcean)
2. **Add the connection string** as `DATABASE_URL` environment variable

## Frontend Configuration

The frontend will be built during deployment and served by the Flask backend. Make sure your Flask app serves the static files:

### Update Flask App (if needed)

Your Flask app should serve the frontend static files. Add this to your `backend/app.py`:

```python
from flask import send_from_directory
import os

# Add this route to serve the frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(f"../frontend/dist/{path}"):
        return send_from_directory('../frontend/dist', path)
    else:
        return send_from_directory('../frontend/dist', 'index.html')
```

## Post-Deployment

### Verify Deployment

1. **Check App**: Visit your Railway domain to ensure the app loads
2. **Check API**: Visit `https://your-domain.railway.app/api/health` to verify the API
3. **Check Database**: Verify database connection in Railway logs

### View Logs

1. **In Railway Dashboard**:
   - Go to your service
   - Click "Deployments" tab
   - Click on a deployment to view logs

2. **Via Railway CLI**:
   ```bash
   railway logs
   ```

## Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Railway dashboard, go to your service
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**:
   - Update `VITE_API_BASE` to use your custom domain

## Monitoring and Analytics

Railway provides:
- **Real-time logs** for debugging
- **Deployment history** with rollback options
- **Resource usage** monitoring
- **Automatic scaling** based on traffic

## Cost Considerations

- **Free Tier**: $5 credit per month
- **Pay-as-you-go**: Only pay for what you use
- **Predictable pricing**: No hidden fees

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Railway logs for error messages
   - Ensure all dependencies are in `requirements.txt`
   - Verify `nixpacks.toml` configuration

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is set correctly
   - Check that PostgreSQL service is running
   - Ensure database migrations run successfully

3. **Frontend Not Loading**:
   - Check that frontend build completed successfully
   - Verify static file serving configuration
   - Check browser console for errors

### Getting Help

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: Check your project's issues

## Advantages of Railway

1. **Seamless Database Integration**: Automatic PostgreSQL setup
2. **Full-Stack Support**: Handles both frontend and backend
3. **Automatic Deployments**: Deploys on every Git push
4. **Easy Scaling**: Automatic scaling based on traffic
5. **Built-in Monitoring**: Real-time logs and metrics
6. **Cost Effective**: Pay only for what you use

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

---

Your MathQuest application should now be successfully deployed on Railway! The platform will handle both your Flask backend and React frontend, with automatic database provisioning and scaling.
