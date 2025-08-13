# Vercel Deployment Instructions for MathQuest

This guide will help you deploy your MathQuest application to Vercel. The project consists of a React frontend and Flask backend in a monorepo structure.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **Vercel CLI** (optional): Install with `npm i -g vercel`

## Environment Variables Setup

Before deploying, you'll need to set up environment variables in Vercel:

### Required Environment Variables

1. **Database Configuration**:
   - `DATABASE_URL`: Your PostgreSQL database connection string
   - `APP_SECRET_KEY`: A secure secret key for your Flask app

2. **Frontend Configuration**:
   - `VITE_API_BASE`: The base URL for your API (will be your Vercel domain)

### Optional Environment Variables

- `PORT`: Port for the Flask app (Vercel will handle this automatically)
- `DEBUG`: Set to `false` for production

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Your Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your MathQuest project

2. **Configure Project Settings**:
   - **Framework Preset**: Select "Other" (since this is a monorepo)
   - **Root Directory**: Leave as `/` (root of your repository)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm run install:all`

3. **Set Environment Variables**:
   - In the project settings, go to "Environment Variables"
   - Add all required environment variables listed above
   - Set `VITE_API_BASE` to your Vercel domain (e.g., `https://your-app.vercel.app`)

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set environment variables when prompted
   - Confirm deployment settings

## Configuration Files

The following configuration files have been created for Vercel deployment:

### `vercel.json`
- Configures the monorepo build process
- Routes API requests to the Flask backend
- Routes frontend requests to the React app

### `backend/api/vercel_app.py`
- Entry point for the Flask backend on Vercel
- Imports and initializes your Flask app

## Database Setup

### Option 1: Use Vercel Postgres (Recommended)

1. **Create Vercel Postgres Database**:
   - In your Vercel dashboard, go to "Storage"
   - Create a new Postgres database
   - Copy the connection string

2. **Set Environment Variable**:
   - Add `DATABASE_URL` with the connection string from Vercel Postgres

3. **Run Migrations**:
   - The database will be automatically initialized when the app starts

### Option 2: Use External Database

1. **Set up PostgreSQL database** (e.g., on Railway, Supabase, or AWS RDS)
2. **Add the connection string** as `DATABASE_URL` environment variable

## Post-Deployment

### Verify Deployment

1. **Check Frontend**: Visit your Vercel domain to ensure the React app loads
2. **Check Backend**: Visit `https://your-domain.vercel.app/api/health` to verify the API is working
3. **Check API Documentation**: Visit `https://your-domain.vercel.app/api/docs` for Swagger documentation

### Troubleshooting

1. **Build Failures**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are properly installed
   - Verify environment variables are set correctly

2. **API Issues**:
   - Check that `DATABASE_URL` is correctly set
   - Verify the Flask app is properly configured
   - Check the function logs in Vercel dashboard

3. **Frontend Issues**:
   - Ensure `VITE_API_BASE` is set to the correct domain
   - Check that the build process completes successfully

## Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**:
   - Update `VITE_API_BASE` to use your custom domain

## Continuous Deployment

Once deployed, Vercel will automatically:
- Deploy new versions when you push to your main branch
- Create preview deployments for pull requests
- Handle rollbacks if needed

## Monitoring and Analytics

- **Function Logs**: Monitor your Flask API in the Vercel dashboard
- **Performance**: Use Vercel Analytics to track frontend performance
- **Uptime**: Vercel provides built-in uptime monitoring

## Cost Considerations

- **Hobby Plan**: Free tier includes 100GB bandwidth and 100 serverless function executions per day
- **Pro Plan**: $20/month for additional resources and features
- **Enterprise Plan**: Custom pricing for large-scale deployments

## Security Best Practices

1. **Environment Variables**: Never commit sensitive data to your repository
2. **CORS**: Configure CORS properly for production
3. **HTTPS**: Vercel automatically provides SSL certificates
4. **Database**: Use connection pooling and proper authentication

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues**: Check your project's GitHub issues for specific problems

---

Your MathQuest application should now be successfully deployed on Vercel! The frontend will be served as static files, and the Flask backend will run as serverless functions.
